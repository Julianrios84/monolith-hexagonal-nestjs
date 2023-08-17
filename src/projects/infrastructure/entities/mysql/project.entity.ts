import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projects')
export class Project {

  @PrimaryGeneratedColumn("uuid")
  readonly project_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @Column({ nullable: false })
  readonly name: string
  
  @Column({ nullable: false })
  readonly description: string
  
  @Column({ type: 'date', nullable: false })
  readonly start_date: Date
  
  @Column({ type: 'date', nullable: false })
  readonly finish_date: Date

  @Column({ nullable: false })
  readonly role: string

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

}