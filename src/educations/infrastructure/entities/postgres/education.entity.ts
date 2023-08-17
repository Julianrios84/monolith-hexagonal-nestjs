import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'educations' })
export class Education {

  @PrimaryGeneratedColumn('uuid')
  readonly  education_id: string;

  @Column({ type: 'uuid', nullable: true })
  readonly  user_id: string;

  @Column({ nullable: true })
  readonly institution: string

  @Column({ nullable: true })
  readonly degree: string
  
  @Column({ nullable: true })
  readonly field_of_study: string
  
  @Column({ type: 'date', nullable: false })
  readonly start_date: Date
  
  @Column({ type: 'date', nullable: false })
  readonly finish_date: Date

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;


}
