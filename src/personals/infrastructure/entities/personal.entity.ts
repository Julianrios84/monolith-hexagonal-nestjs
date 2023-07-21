import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class DataPersonal {
  
  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public first_name: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public last_name: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public email: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public phone: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public address: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public city: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public country: string;

  @AutoMap()
  @Prop({ type: String, require: true })
  public resume: string;
}

export const DataPersonalSchema = SchemaFactory.createForClass(DataPersonal);
