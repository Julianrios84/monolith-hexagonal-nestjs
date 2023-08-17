import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'personals' })
export class DataPersonal {
  
  @ObjectIdColumn()
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly personal_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @Column({ nullable: false })
  readonly first_name: string;

  @Column({ nullable: false })
  readonly last_name: string;

  @Column({ nullable: false })
  readonly email: string;

  @Column({ nullable: false })
  readonly phone: string;

  @Column({ nullable: false })
  readonly address: string;

  @Column({ nullable: false })
  readonly city: string;

  @Column({ nullable: false })
  readonly country: string;

  @Column({ nullable: false })
  readonly resume: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}

