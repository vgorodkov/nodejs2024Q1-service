import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return;
        }

        if (!Array.isArray(data)) {
          const { password, ...noPassUser } = data;
          noPassUser.createdAt = new Date(noPassUser.createdAt).getTime();
          noPassUser.updatedAt = new Date(noPassUser.updatedAt).getTime();

          return noPassUser;
        }

        return data.map((user) => {
          const { password, ...noPassUser } = user;
          noPassUser.createdAt = new Date(noPassUser.createdAt).getTime();
          noPassUser.updatedAt = new Date(noPassUser.updatedAt).getTime();

          return noPassUser;
        });
      }),
    );
  }
}
