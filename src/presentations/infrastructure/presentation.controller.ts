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
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@presentations/application/dto';
import { PresentationService } from '@presentations/application/services';
import { ParseMongoIdPipe } from '@common/infrastructure/pipes';
import { UserLoggedIn } from '@common/root/application/decorators';

@ApiTags('presentations')
@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

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
    return await this.presentationService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<GetDto> {
    return await this.presentationService.findOne(user.id, id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@UserLoggedIn() user, @Body() body: CreateDto): Promise<GetDto> {
    console.log(body)
    return await this.presentationService.create(user.id, body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.presentationService.update(user.id, id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(
    @UserLoggedIn() user,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<DeleteDto> {
    return await this.presentationService.delete(user.id, id);
  }
}
