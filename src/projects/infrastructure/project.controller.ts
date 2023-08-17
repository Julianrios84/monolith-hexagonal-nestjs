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
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@projects/application/dto';
import { ProjectService } from '@projects/application/services/project.service';
import { ParseArrayMongoIdPipe, ParseMongoIdPipe } from '@common/infrastructure/pipes';
import { UserLoggedIn } from '@common/root/application/decorators';

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
  async findAll(@UserLoggedIn() user): Promise<GetDto[]> {
    return await this.projectService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@UserLoggedIn() user, @Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.projectService.findOne(user.id, id);
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
  async findIn(@UserLoggedIn() user, @Body(ParseArrayMongoIdPipe) ids: string[]): Promise<GetDto[]> {
    return await this.projectService.findIn(user.id, ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@UserLoggedIn() user, @Body() body: CreateDto): Promise<GetDto> {
    console.log(body);
    return await this.projectService.create(user.id, body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.projectService.update(user.id, id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@UserLoggedIn() user, @Param('id', ParseMongoIdPipe) id: string): Promise<DeleteDto> {
    return await this.projectService.delete(user.id, id);
  }
}
