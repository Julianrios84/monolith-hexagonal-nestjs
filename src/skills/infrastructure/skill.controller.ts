import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Controller,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { SkillService } from '@skills/application/services';
import { CreateDto, DeleteDto, GetDto, UpdateDto } from '@skills/application/dto';
import { UserLoggedIn } from '@common/root/application/decorators';
import { JwtAuthGuard } from '@common/root/infrastructure/guards/jwt.auth.guard';

@ApiTags('skills')
@Controller('skill')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  async findAll(@UserLoggedIn() user): Promise<GetDto[]> {
    return await this.skillService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async findOne(@UserLoggedIn() user, @Param('id', ParseUUIDPipe) id: string): Promise<GetDto> {
    return await this.skillService.findOne(user.id, id);
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
  async findIn(@UserLoggedIn() user, @Body() ids: string[]): Promise<GetDto[]> {
    return await this.skillService.findIn(user.id, ids);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: GetDto,
  })
  async create(@UserLoggedIn() user, @Body() body: CreateDto): Promise<GetDto> {
    return await this.skillService.create(user.id, body);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: '', type: GetDto })
  async update(
    @UserLoggedIn() user,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateDto,
  ): Promise<GetDto> {
    return await this.skillService.update(user.id, id, body);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: '', type: DeleteDto })
  async delete(@UserLoggedIn() user, @Param('id', ParseUUIDPipe) id: string): Promise<DeleteDto> {
    return await this.skillService.delete(user.id, id);
  }
}
