import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' }) 
export class User {
  
  @ObjectIdColumn()
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false})
  readonly user_id: string;

  @Column({ nullable: false, unique: true })
  readonly username: string;

  @Column({ nullable: false, unique: true })
  readonly email: string
  
  @Column({  nullable: false })
  readonly password: string

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}