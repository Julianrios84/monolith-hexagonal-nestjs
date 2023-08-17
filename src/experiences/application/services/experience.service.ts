import { Injectable } from "@nestjs/common";
import { ICreateDto, IDeleteDto, IGetDto, IUpdateDto } from "@experiences/domain/dto";
import { ICreateUseCase, IDeleteUseCase, IFindAllUseCase, IFindInUseCase, IFindOneUseCase, IUpdateUseCase } from "@experiences/domain/ports";

@Injectable()
export class ExperienceService
  implements
    IFindAllUseCase,
    IFindOneUseCase,
    IFindInUseCase,
    ICreateUseCase,
    IUpdateUseCase,
    IDeleteUseCase
{

  constructor(
    private readonly findAllUseCase: IFindAllUseCase,
    private readonly findOneUseCase: IFindOneUseCase,
    private readonly findInUseCase: IFindInUseCase,
    private readonly createUseCase: ICreateUseCase,
    private readonly updateUseCase: IUpdateUseCase,
    private readonly deleteUseCase: IDeleteUseCase,
  ) {}

  async findAll(user_id: string): Promise<IGetDto[]> {
    return await this.findAllUseCase.findAll(user_id);
  }

  async findOne(user_id: string, id: string): Promise<IGetDto> {
    return await this.findOneUseCase.findOne(user_id, id);
  }

  async findIn(user_id: string, ids: string[]): Promise<IGetDto[]> {
    return await this.findInUseCase.findIn(user_id, ids);
  }

  async create(user_id: string, body: ICreateDto): Promise<IGetDto> {
    return await this.createUseCase.create(user_id, body);
  }

  async update(user_id: string, id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.updateUseCase.update(user_id, id, body);
  }

  async delete(user_id: string, id: string): Promise<IDeleteDto> {
    return await this.deleteUseCase.delete(user_id, id);
  }


}