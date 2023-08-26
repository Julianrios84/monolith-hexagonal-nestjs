import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' }) 
@ObjectType('users')
export class User {
  
  @ObjectIdColumn()
  @Field(() => ID)
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false})
  @Field(() => String)
  readonly user_id: string;

  @Column({ nullable: false, unique: true })
  @Field(() => String)
  readonly username: string;

  @Column({ nullable: false, unique: true })
  @Field(() => String)
  readonly email: string
  
  @Column({  nullable: false })
  @Field(() => String)
  readonly password: string

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  readonly updatedAt: Date;
}