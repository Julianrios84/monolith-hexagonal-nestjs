import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@personals/domain/dto";
import { IRepository } from "@personals/domain/ports";
import { DataPersonal } from "@personals/infrastructure/entities/mysql";
import { Connection } from "@common/domain/constants";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { GetDto } from "@personals/application/dto";
import { DataPersonalModel } from "@personals/domain/model";

@Injectable()
export class MySQLPersonalRepository implements IRepository {
  
  constructor(
    @InjectRepository(DataPersonal, Connection.personal.name)
    private repository: Repository<DataPersonal>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: { user_id }})
    return this.mapper.mapArrayAsync(
      response,
      DataPersonalModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { personal_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, DataPersonalModel, GetDto);
  }


  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ personal_id: await this.uuidService.create(), user_id,  ...body })
    return this.mapper.map(record, DataPersonalModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ personal_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ personal_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      DataPersonalModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ personal_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}