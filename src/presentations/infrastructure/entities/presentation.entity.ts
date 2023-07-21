import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true})

export class Presentation {

  @AutoMap()
  public _id: string;

  @Prop({ type: Types.ObjectId, required: true })
  public user_id: string;

  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_full_name: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_title: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_address: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_country: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_city: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_phone: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly of_email: string;

  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly to_full_name: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly to_email: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly to_company: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly to_address: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly to_city: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly to_country: string;

  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly greeting: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly content: string;
  
  @AutoMap()
  @Prop({ type: Date, required: true })
  readonly date: Date;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly closing: string;
  
  @AutoMap()
  @Prop({ type: String, required: true })
  readonly signature: string;
  

}

export const PresentationSchema = SchemaFactory.createForClass(Presentation);