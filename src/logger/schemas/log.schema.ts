import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
  @Prop({type: String, required: true})
  uri: string;

  @Prop({type: String, required: true})
  controller: string;

  @Prop({type: String, required: true})
  action: string;

  @Prop({type: Object, required: true})
  post_data?: any;

  @Prop({type: Object, required: true})
  response_data?: any;

  @Prop({type: Date, required: true})
  requested_at: Date;

  @Prop({type: Date, required: true})
  respond_at?: Date;

  @Prop({type: String, required: true})
  log_type: string;

  @Prop({type: String, required: true})
  ip?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);