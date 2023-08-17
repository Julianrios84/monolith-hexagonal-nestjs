import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'skills' })
export class Skill {

  @ObjectIdColumn()
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false})
  readonly skill_id: string;

  @Column({ type: 'uuid', nullable: false})
  readonly user_id: string;

  @Column({ nullable: false })
  readonly type: string;

  @Column({ nullable: false })
  readonly name: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}