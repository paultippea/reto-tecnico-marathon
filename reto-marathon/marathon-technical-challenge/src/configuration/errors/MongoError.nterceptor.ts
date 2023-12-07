import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MongoError } from 'mongodb';

@Injectable()
export class MongoErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof MongoError) {
          console.log("==============");
          console.log(error.errmsg);
          return throwError(() => new BadRequestException("Error al ingresar el registro"));
        }
        return throwError(() => error);
      }),
    );
  }
}
