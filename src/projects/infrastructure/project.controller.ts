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
import { ProjectService } from '../application/services/project.service';
import { ParseArrayMongoIdPipe, ParseMongoIdPipe } from 'src/common/infrastructure/pipes';

@ApiTags('projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

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
    return await this.projectService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.projectService.findOne(id);
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
    return await this.projectService.findIn(ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@Body() body: CreateDto): Promise<GetDto> {
    console.log(body);
    return await this.projectService.create(body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.projectService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<DeleteDto> {
    return await this.projectService.delete(id);
  }
}
