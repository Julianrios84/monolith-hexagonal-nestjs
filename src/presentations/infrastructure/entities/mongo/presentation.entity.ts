import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'presentations' })
export class Presentation {

  @ObjectIdColumn()
  readonly _id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly presentation_id: string;

  @Column({ type: 'uuid', nullable: false })
  readonly user_id: string;

  @Column({ nullable: false })
  readonly of_full_name: string;
  
  @Column({ nullable: false })
  readonly of_title: string;
  
  @Column({ nullable: false })
  readonly of_address: string;
  
  @Column({ nullable: false })
  readonly of_country: string;
  
  @Column({ nullable: false })
  readonly of_city: string;
  
  @Column({ nullable: false })
  readonly of_phone: string;
  
  @Column({ nullable: false })
  readonly of_email: string;

  @Column({ nullable: false })
  readonly to_full_name: string;
  
  @Column({ nullable: false })
  readonly to_email: string;
  
  @Column({ nullable: false })
  readonly to_company: string;
  
  @Column({ nullable: false })
  readonly to_address: string;
  
  @Column({ nullable: false })
  readonly to_city: string;
  
  @Column({ nullable: false })
  readonly to_country: string;

  @Column({ nullable: false })
  readonly greeting: string;
  
  @Column({ nullable: false })
  readonly content: string;
  
  @Column({ type: 'date', nullable: false })
  readonly date: Date;
  
  @Column({ nullable: false })
  readonly closing: string;
  
  @Column({ nullable: false })
  readonly signature: string;
  
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}