import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'courses' })
export class Course {

  @PrimaryGeneratedColumn('uuid')
  readonly course_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @Column({ nullable: false })
  readonly title: string
  
  @Column({ nullable: false })
  readonly supplier: string

  @Column({ nullable: false })
  readonly description: string

  @Column({ nullable: false })
  readonly duration: string

  @Column({ nullable: false })
  readonly url: string

  @Column({ type: 'int', default: 0 })
  readonly qualification: number

  @Column({ type: 'simple-array', nullable: true })
  readonly tags: string[]

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
