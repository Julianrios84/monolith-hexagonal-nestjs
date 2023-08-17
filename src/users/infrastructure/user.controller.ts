import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Controller,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { UserService } from '@users/application/services';
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@users/application/dto';
import { JwtAuthGuard } from '@common/infrastructure/guards/jwt.auth.guard';

@ApiTags('users')
@Controller('user')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<GetDto> {
    return await this.userService.findOne(id);
  }

  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOneTPC(@Param('id', ParseUUIDPipe) id: string): Promise<GetDto> {
    return await this.userService.findOne(id);
  }

  @Get('/username/:username')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findByUsername(@Param('username') username: string): Promise<GetDto> {
    return await this.userService.findByUsername(username);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@Body() body: CreateDto): Promise<GetDto> {
    return await this.userService.create(body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteDto> {
    return await this.userService.delete(id);
  }
}
