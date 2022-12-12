import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GeneralInterceptor } from './general.interceptor';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URL)
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: GeneralInterceptor
        },
    ]
})
export class LoggerModule {}
