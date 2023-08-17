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
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@educations/application/dto';
import { EducationService } from '@educations/application/services';
import {
  ParseArrayMongoIdPipe,
  ParseMongoIdPipe,
} from '@common/infrastructure/pipes';
import { UserLoggedIn } from '@common/root/application/decorators';

@ApiTags('educations')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

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
    return await this.educationService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@UserLoggedIn() user, @Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.educationService.findOne(user.id, id);
  }

  @Post('/in')
  @ApiResponse({
    status: 200,
    description: '',
    schema: {
      allOf: [
        {
          type: 'array',
          items: { $ref: getSchemaPath(GetDto) },
        },
      ],
    },
  })
  async findIn(@UserLoggedIn() user, @Body(ParseArrayMongoIdPipe) ids: string[]): Promise<GetDto[]> {
    return await this.educationService.findIn(user.id, ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@UserLoggedIn() user, @Body() body: CreateDto): Promise<GetDto> {
    console.log(body);
    return await this.educationService.create(user.id, body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.educationService.update(user.id, id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@UserLoggedIn() user, @Param('id', ParseMongoIdPipe) id: string): Promise<DeleteDto> {
    return await this.educationService.delete(user.id, id);
  }
}
