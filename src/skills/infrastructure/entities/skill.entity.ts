import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class Skill {

  @AutoMap()
  @Prop({ type: Types.ObjectId, required: true })
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  public type: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  public name: string;

  


}

export const SkillSchema = SchemaFactory.createForClass(Skill);