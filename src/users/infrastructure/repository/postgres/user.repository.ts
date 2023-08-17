import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IGetDto, ICreateDto, IUpdateDto, IDeleteDto } from "@users/domain/dto";
import { IRepository } from "@users/domain/ports";
import { User } from "@users/infrastructure/entities/postgres";
import { Connection } from "@common/domain/constants";
import { Repository } from "typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { IBcryptService, IUUIDService } from "@common/domain/adapters";
import { UserModel } from "@users/domain/model";
import { GetDto } from "@users/application/dto";

@Injectable()
export class PostgresUserRepository implements IRepository {

  constructor(
    @InjectRepository(User, Connection.user.name)
    private repository: Repository<User>,

    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly bcryptService: IBcryptService,

    private readonly uuidService: IUUIDService
  ) {}

  async findAll(): Promise<IGetDto[]> {
    return this.mapper.mapArrayAsync(
      await this.repository.find(),
      UserModel,
      GetDto,
    );
  }

  async findOne(id: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ user_id: id });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, UserModel, GetDto);
  }

  async findByUsername(username: string): Promise<IGetDto> {
    const response = await this.repository.findOneBy({ username: username });
    if (!response) throw new NotFoundException('Record not found');
    return this.mapper.mapAsync(response, UserModel, GetDto);
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    const data = {
      // user_id: await this.uuidService.create(),
      ...body,
      password: await this.bcryptService.hash(body.password),
    };
    const record =  await this.repository.save(data);
    return this.mapper.map(record, UserModel, GetDto);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    const data = { ...body, password: await this.bcryptService.hash(body.password) };

    const record = await this.findOne(id);
    const result = { ...record, ...data };
    const response = await this.repository.save(result);
    return this.mapper.mapAsync(
      response,
      UserModel,
      GetDto,
    );
  }

  async delete(id: string): Promise<IDeleteDto> {
    await this.findOne(id);
    await this.repository.delete({ user_id: id });
    return { status: HttpStatus.OK, message: 'Record deleted.' };
  }
  
}