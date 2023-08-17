import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'educations' })
export class Education {

  @ObjectIdColumn()
  readonly  _id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly  education_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly  user_id: string;

  @Column({ nullable: false })
  readonly institution: string

  @Column({ nullable: false })
  readonly degree: string
  
  @Column({ nullable: false })
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
