import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID
} from '@nestjs/graphql';
import { UserService } from '@users/application/services';
import { CreateType, DeleteType, GetType, UpdateType } from '@users/application/types';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [GetType], { name: "user_findall" })
  async findAll(): Promise<GetType[]> {
    return await this.userService.findAll();  
  }

  @Query(() => GetType, { name: "user_findone" })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<GetType> {
    return await this.userService.findOne(id);
  }

  @Query(() => GetType, { name: "user_findbyusername" })
  async findByUsername(
    @Args('username', { type: () => String }) username: string,
  ): Promise<GetType> {
    return await this.userService.findByUsername(username);
  }

  @Mutation(()  => GetType, { name: 'user_create' })
  async create(@Args('body') body: CreateType): Promise<GetType> {
    return await this.userService.create(body);
  }

  @Mutation(() => GetType, { name: 'user_update' })
  async update(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('body') body: UpdateType,
  ): Promise<GetType> {
    return await this.userService.update(id, body);
  }

  @Mutation(() => DeleteType, { name: 'user_delete' })
  async delete(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<DeleteType> {
    return await this.userService.delete(id);
  }
}
