import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GeneralInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const methodName = context.getHandler().name;

    const body = context.switchToHttp().getRequest().body;
    Logger.log(`General Log: ${className}.${methodName} started...`);
    if (body !== null) {
      Logger.log(`General RequestBody - ${JSON.stringify(body)}`);
    }
    return next
      .handle()
      .pipe(tap(() => Logger.log(`General Log: ${className}.${methodName} exited`)));
  }
}
