import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'curriculums' })
export class Curriculum {

  @ObjectIdColumn()
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly curriculum_id: string;
  
  @Column({ type:'uuid', nullable: false })
  readonly user_id: string;
  
  @Column({ nullable: false })
  readonly title: string
  
  @Column({ type: 'uuid', nullable: false })
  readonly  datapersonal: string
  
  @Column({  type: 'simple-array', nullable: false })
  readonly  educations: string[]

  @Column({  type: 'simple-array', nullable: false })
  readonly  workexperies: string[]

  @Column({  type: 'simple-array', nullable: false })
  readonly  skills: string[]
  
  @Column({  type: 'simple-array', nullable: false })
  readonly  certifications: string[]
  
  @Column({  type: 'simple-array', nullable: false })
  readonly  courses: string[]
  
  @Column({  type: 'simple-array', nullable: false })
  readonly  projects: string[]
    
  @Column({ type: 'uuid', nullable: true })
  readonly  presentation: string
  
  @Column({ type: 'boolean', default: false })
  readonly status: boolean

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
