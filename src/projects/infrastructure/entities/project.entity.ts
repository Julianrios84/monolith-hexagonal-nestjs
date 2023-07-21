import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class Project {

  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  public name: string
  
  @AutoMap()
  @Prop({ type: String, required: true })
  public description: string
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  public start_date: Date
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  public finish_date: Date

  @AutoMap()
  @Prop({ type: String, required: true })
  public role: string


}

export const ProjectSchema = SchemaFactory.createForClass(Project);