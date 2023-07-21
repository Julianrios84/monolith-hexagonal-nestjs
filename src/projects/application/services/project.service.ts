import { Injectable } from "@nestjs/common";
import { ICreateDto, IDeleteDto, IGetDto, IUpdateDto } from "src/projects/domain/dto";
import { ICreateUseCase, IDeleteUseCase, IFindAllUseCase, IFindInUseCase, IFindOneUseCase, IUpdateUseCase } from "src/projects/domain/ports";

@Injectable()
export class ProjectService
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

  async findAll(): Promise<IGetDto[]> {
    return await this.findAllUseCase.findAll();
  }

  async findOne(id: string): Promise<IGetDto> {
    return await this.findOneUseCase.findOne(id);
  }

  async findIn(ids: string[]): Promise<IGetDto[]> {
    return await this.findInUseCase.findIn(ids);
  }

  async create(body: ICreateDto): Promise<IGetDto> {
    return await this.createUseCase.create(body);
  }

  async update(id: string, body: IUpdateDto): Promise<IGetDto> {
    return await this.updateUseCase.update(id, body);
  }

  async delete(id: string): Promise<IDeleteDto> {
    return await this.deleteUseCase.delete(id);
  }


}