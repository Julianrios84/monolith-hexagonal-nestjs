import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Controller,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '../application/dto';
import { PersonalService } from '../application/services/personal.service';
import { ParseMongoIdPipe } from 'src/common/infrastructure/pipes';

@ApiTags('personaldata')
@Controller('personaldata')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all records',
    schema: {
      allOf: [
        {
          type: 'array',
          items: { $ref: getSchemaPath(GetDto) },
        },
      ],
    },
  })
  async findAll(): Promise<GetDto[]> {
    return await this.personalService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<GetDto> {
    return await this.personalService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@Body() body: CreateDto): Promise<GetDto> {
    console.log(body)
    return await this.personalService.create(body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.personalService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<DeleteDto> {
    return await this.personalService.delete(id);
  }
}
