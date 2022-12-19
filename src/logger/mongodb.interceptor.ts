import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class MongodbInterceptor implements NestInterceptor {

  constructor(
    private loggerService : LoggerService
  ){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;

    const {url, body, headers, ip} = context.switchToHttp().getRequest();
    const loggerData = {
      uri: url,
      controller: className,
      action: methodName,
      post_data: {
        headers,
        body
      },
      requested_at: new Date(),
      log_type: 'access_log',
      ip
    };
    return next
      .handle()
      .pipe(tap(async data => {
        data = JSON.parse(JSON.stringify(
          data,
          (key, value) => (typeof value === 'bigint' ? value.toString() : value) ));
        loggerData['response_data'] = data;
        loggerData['respond_at'] = new Date();
        await this.loggerService.insertLog(loggerData);
      }));
  }
}
