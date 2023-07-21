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

import { SkillService } from '../application/services';
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '../application/dto';
import { ParseArrayMongoIdPipe, ParseMongoIdPipe } from 'src/common/infrastructure/pipes';

@ApiTags('skills')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

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
    return await this.skillService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.skillService.findOne(id);
  }

  @Post('/in')
  @ApiResponse({ 
    status: 200, 
    description: '',
    schema: {
      allOf: [
        {
          type: 'array',
          items: { $ref: getSchemaPath(GetDto) }
        }
      ]
    }
  })
  async findIn(@Body(ParseArrayMongoIdPipe) ids: string[]): Promise<GetDto[]> {
    return await this.skillService.findIn(ids);
  }

  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOneTPC(@Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.skillService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@Body() body: CreateDto): Promise<GetDto> {
    return await this.skillService.create(body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.skillService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<DeleteDto> {
    return await this.skillService.delete(id);
  }
}
