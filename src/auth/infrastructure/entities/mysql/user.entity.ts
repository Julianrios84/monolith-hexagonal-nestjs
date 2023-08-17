import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' }) 
export class User {

  @PrimaryGeneratedColumn("uuid")
  readonly  user_id: string;

  @Column({ unique: true, nullable: false })
  readonly  username: string;

  @Column({ unique: true, nullable: false })
  readonly  email: string
  
  @Column({ nullable: false })
  readonly  password: string

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
} 