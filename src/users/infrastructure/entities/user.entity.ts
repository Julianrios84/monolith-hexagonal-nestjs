import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true})
export class User {

  @AutoMap()
  public _id: string;

  @AutoMap()
  @Prop({ type: String, required: true, unique: true })
  public username: string;

  @AutoMap()
  @Prop({ type: String, required: true, unique: true })
  public email: string
  
  @AutoMap()
  @Prop({ type: String, required: true })
  public password: string
  
}

export const UserSchema = SchemaFactory.createForClass(User);