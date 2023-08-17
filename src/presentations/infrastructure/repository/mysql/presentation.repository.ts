import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@presentations/domain/dto";
import { IRepository } from "@presentations/domain/ports";
import { Presentation } from "@presentations/infrastructure/entities/mysql";
import { Connection } from "@common/domain/constants";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { PresentationModel } from "@presentations/domain/model";
import { GetDto } from "@presentations/application/dto";

@Injectable()
export class MySQLPresentationRepository implements IRepository {
  
  constructor(
    @InjectRepository(Presentation, Connection.presentation.name)
    private repository: Repository<Presentation>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: {user_id}})
    return this.mapper.mapArrayAsync(
      response,
      PresentationModel,
      GetDto,
    );
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { presentation_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, PresentationModel, GetDto);
  }


  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ presentation_id: await this.uuidService.create(), user_id,  ...body })
    return this.mapper.map(record, PresentationModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ presentation_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ presentation_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      PresentationModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ presentation_id: id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}