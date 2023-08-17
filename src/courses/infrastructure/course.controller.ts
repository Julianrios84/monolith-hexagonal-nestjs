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
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@courses/application/dto';
import { CourseService } from '@courses/application/services';
import { ParseArrayMongoIdPipe, ParseMongoIdPipe } from '@common/infrastructure/pipes';
import { UserLoggedIn } from '@common/root/application/decorators';

@ApiTags('courses')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
    return await this.courseService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<GetDto> {
    return await this.courseService.findOne(user.id, id);
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
    return await this.courseService.findIn(user.id, ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@UserLoggedIn() user, @Body() body: CreateDto): Promise<GetDto> {
    return await this.courseService.create(user.id, body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.courseService.update(user.id, id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<DeleteDto> {
    return await this.courseService.delete(user.id, id);
  }
}
