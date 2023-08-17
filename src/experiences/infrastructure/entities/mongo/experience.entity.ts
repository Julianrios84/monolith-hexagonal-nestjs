import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'experiences' })
export class Experience {

  @ObjectIdColumn()
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly experience_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @Column({ nullable: false })
  readonly title: string
  
  @Column({ nullable: false })
  readonly company: string
  
  @Column({ nullable: false })
  readonly description: string
  
  @Column({ type: 'date', nullable: false })
  readonly start_date: Date
  
  @Column({ type: 'date', nullable: false })
  readonly finish_date: Date

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
