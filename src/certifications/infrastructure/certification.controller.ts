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
import { CertificationService } from '../application/services';
import { ParseArrayMongoIdPipe, ParseMongoIdPipe } from 'src/common/infrastructure/pipes';

@ApiTags('certifications')
@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

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
    return await this.certificationService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<GetDto> {
    return await this.certificationService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@Body() body: CreateDto): Promise<GetDto> {
    console.log(body);
    return await this.certificationService.create(body);
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
  @ApiResponse({ status: 200, description: '', type: [GetDto] })
  async findIn(@Body(ParseArrayMongoIdPipe) ids: string[]): Promise<GetDto[]> {
    return await this.certificationService.findIn(ids);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.certificationService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<DeleteDto> {
    return await this.certificationService.delete(id);
  }
}
