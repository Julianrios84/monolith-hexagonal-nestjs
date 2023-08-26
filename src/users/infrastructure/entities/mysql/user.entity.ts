import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users'})
@ObjectType('users')
export class User {

  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  readonly user_id: string;

  @Column({ unique: true, nullable: false })
  @Field(() => String)
  readonly username: string;

  @Column({ unique: true, nullable: false })
  @Field(() => String)
  readonly email: string
  
  @Column({ nullable: false })
  @Field(() => String)
  readonly password: string

  @CreateDateColumn()
  @Field(() => Date)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  readonly updatedAt: Date;
} 