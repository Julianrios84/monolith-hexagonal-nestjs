import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class Course {

  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  public title: string
  
  @AutoMap()
  @Prop({ type: String, required: true })
  public supplier: string

  @AutoMap()
  @Prop({ type: String, required: true })
  public description: string

  @AutoMap()
  @Prop({ type: String, required: true })
  public duration: string

  @AutoMap()
  @Prop({ type: String, required: true })
  public url: string

  @AutoMap()
  @Prop({ type: Number, default: 0 })
  public qualification: number

  @AutoMap()
  @Prop({ type: [{ type: String }] })
  public tags: string[]


}

export const CourseSchema = SchemaFactory.createForClass(Course);