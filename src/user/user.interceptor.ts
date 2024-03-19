import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
 
    return next.handle().pipe(map(data=>{

      if(!data){
        return
      }

      if(!Array.isArray(data)){
        const { password, ...noPassUser } = data;
        return noPassUser;
      }

      return data.map(user=>{
        const {password,...noPassUser} = user
        return noPassUser
      })
    }));
  }
}
