import { Injectable } from "@nestjs/common";
import { ICreateDto, IDeleteDto, IGetDto, IUpdateDto } from "@curriculums/domain/dto";
import { ICreateUseCase, IDeleteUseCase, IFindActiveUseCase, IFindAllUseCase, IFindOneUseCase, IUpdateUseCase } from "@curriculums/domain/ports";

@Injectable()
export class CurriculumService
  implements
    IFindAllUseCase,
    IFindOneUseCase,
    IFindActiveUseCase,
    ICreateUseCase,
    IUpdateUseCase,
    IDeleteUseCase
{

  constructor(
    private readonly findAllUseCase: IFindAllUseCase,
    private readonly findOneUseCase: IFindOneUseCase,
    private readonly findActiveUseCase: IFindActiveUseCase,
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

  async findActive(user_id: string): Promise<IGetDto> {
    return await this.findActiveUseCase.findActive(user_id);
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