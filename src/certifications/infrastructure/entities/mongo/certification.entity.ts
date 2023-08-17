import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'certifications' })
export class Certification {

  @ObjectIdColumn()
  public _id: string;

  @Column({ type: 'uuid', nullable: false })
  public certification_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @Column({ nullable: false })
  readonly title: string
  
  @Column({ nullable: false })
  readonly institution: string
  
  @Column({ type: 'date', nullable: false })
  readonly start_date: Date
  
  @Column({ type: 'date', nullable: false })
  readonly finish_date: Date

  @CreateDateColumn()
  readonly createdAt: Date

  @UpdateDateColumn()
  readonly updatedAt: Date

}
