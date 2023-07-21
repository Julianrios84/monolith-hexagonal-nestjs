import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class WorkExperience {

  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  public title: string
  
  @AutoMap()
  @Prop({ type: String, required: true })
  public company: string
  
  @AutoMap()
  @Prop({ type: String, required: true })
  public description: string
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  public start_date: Date
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  public finish_date: Date


}

export const WorkExperienceSchema = SchemaFactory.createForClass(WorkExperience);