import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class Education {

  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  readonly institution: string

  @AutoMap()
  @Prop({ type: String, required: true })
  readonly degree: string
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly field_of_study: string
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  readonly start_date: Date
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  readonly finish_date: Date


}

export const EducationSchema = SchemaFactory.createForClass(Education);