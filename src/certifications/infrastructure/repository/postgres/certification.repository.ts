import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Connection } from "@common/domain/constants";
import { IRepository } from "@certifications/domain/ports";
import { Certification } from "@certifications/infrastructure/entities/postgres";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IUUIDService } from "@common/domain/adapters/uuid.interface";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@certifications/domain/dto";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CertificationModel } from "@certifications/domain/model";
import { GetDto } from "@certifications/application/dto";

@Injectable()
export class PostgresCertificationRepository implements IRepository {
  constructor(
    @InjectRepository(Certification, Connection.certification.name)
    private repository: Repository<Certification>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly uuidService: IUUIDService
  ) {}

   async findAll(user_id: string): Promise<IGetDto[]> {
    const response =   await this.repository.find({ where: {user_id}})
    return this.mapper.mapArrayAsync(
      response,
      CertificationModel,
      GetDto,
    );
  }


  async findOne(user_id: string,id: string): Promise<IGetDto> {
    const response = await this.repository.findOne({ where: { certification_id: id, user_id} });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, CertificationModel, GetDto);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find({ where: { certification_id : In(ids), user_id} }),
      CertificationModel,
      GetDto,
    );
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    const record = await this.repository.save({ 
      // certification_id: await this.uuidService.create(),  
      user_id,
      ...body })
    return this.mapper.map(record, CertificationModel, GetDto);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    await this.findOne(user_id, id)
    await this.repository.update({ certification_id:id, user_id }, body);
    const response = await this.repository.findOneBy({ certification_id: id, user_id });
    return this.mapper.mapAsync(
      response,
      CertificationModel,
      GetDto,
    );
  }
  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    await this.findOne(user_id, id);
    await this.repository.delete({ certification_id: id, user_id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
}