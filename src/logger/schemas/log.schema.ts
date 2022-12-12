import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
  @Prop()
  uri: string;

  @Prop()
  controller: string;

  @Prop()
  action: string;

  @Prop()
  post_data?: any;

  @Prop()
  response_data?: any;

  @Prop()
  requested_at: Date;

  @Prop()
  respond_at?: Date;

  @Prop()
  type: string;

  @Prop()
  ip?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);