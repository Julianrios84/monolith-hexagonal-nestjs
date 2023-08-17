import { AutoMap } from "@automapper/classes";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Certification {

  @PrimaryGeneratedColumn('uuid')
  readonly certification_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @AutoMap()
  @Column({ nullable: false })
  readonly title: string
  
  @AutoMap()
  @Column({ nullable: false })
  readonly institution: string
  
  @AutoMap()
  @Column({ type: 'date', nullable: false })
  readonly start_date: Date
  
  @AutoMap()
  @Column({ type: 'date', nullable: false })
  readonly finish_date: Date

  @CreateDateColumn()
  readonly createdAt: Date

  @UpdateDateColumn()
  readonly updatedAt: Date

}
