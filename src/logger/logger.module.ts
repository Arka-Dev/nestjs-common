import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GeneralInterceptor } from './general.interceptor';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbInterceptor } from './mongodb.interceptor';
import { LogSchema } from './schemas/log.schema';
import { LoggerService } from './logger.service';

@Module({
    imports:[
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        MongooseModule.forFeature([{name: 'MLOG', schema: LogSchema}])
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: GeneralInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: MongodbInterceptor
        },
        LoggerService,
    ]
})
export class LoggerModule {}
