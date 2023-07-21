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
import { EducationService } from '../application/services';
import {
  ParseArrayMongoIdPipe,
  ParseMongoIdPipe,
} from 'src/common/infrastructure/pipes';

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
  async findAll(): Promise<GetDto[]> {
    return await this.educationService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.educationService.findOne(id);
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
  async findIn(@Body(ParseArrayMongoIdPipe) ids: string[]): Promise<GetDto[]> {
    return await this.educationService.findIn(ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@Body() body: CreateDto): Promise<GetDto> {
    console.log(body);
    return await this.educationService.create(body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.educationService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<DeleteDto> {
    return await this.educationService.delete(id);
  }
}
