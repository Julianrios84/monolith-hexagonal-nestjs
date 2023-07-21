import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class Curriculum {

  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public title: string

  @AutoMap()
  @Prop({ type: Types.ObjectId, require: true })
  public  datapersonal: string
  
  @AutoMap()
  @Prop({ type: [{ type: Types.ObjectId }] })
  public  educations: string[]

  @AutoMap()
  @Prop({ type: [{ type: Types.ObjectId }] })
  public  workexperies: string[]

  @AutoMap()
  @Prop({ type: [{ type: Types.ObjectId }] })
  public  skills: string[]
  
  @AutoMap()
  @Prop({ type: [{ type: Types.ObjectId }] })
  public  certifications: string[]

  @AutoMap()
  @Prop({ type: [{ type: Types.ObjectId }] })
  public  courses: string[]

  @AutoMap()
  @Prop({ type: [{ type: Types.ObjectId }] })
  public  projects: string[]
    
  @AutoMap()
  @Prop({ type: Types.ObjectId })
  public  presentation: string

  @AutoMap()
  @Prop({ type: Boolean, default: false })
  public status: boolean

}

export const CurriculumSchema = SchemaFactory.createForClass(Curriculum);