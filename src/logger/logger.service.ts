import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './schemas/log.schema';

@Injectable()
export class LoggerService {

    constructor(
        @InjectModel('MLOG') private readonly mlogModel: Model<Log>,
    ){}

    async insertLog(data){
        const newLog = new this.mlogModel({
            ...data
        });
        const result = await newLog.save();
        return result;
    }
}
