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
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@experiences/application/dto';
import { ExperienceService } from '@experiences/application/services';
import { ParseArrayMongoIdPipe, ParseMongoIdPipe } from '@common/infrastructure/pipes';
import { UserLoggedIn } from '@common/root/application/decorators';

@ApiTags('experiences')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

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
    return await this.experienceService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<GetDto> {
    return await this.experienceService.findOne(user.id, id);
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
    return await this.experienceService.findIn(user.id, ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@UserLoggedIn() user, @Body() body: CreateDto): Promise<GetDto> {
    return await this.experienceService.create(user.id,body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.experienceService.update(user.id,id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<DeleteDto> {
    return await this.experienceService.delete(user.id,id);
  }
}
