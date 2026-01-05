import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map } from 'rxjs/operators';



@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((payload) => ({
                statusCode: res.statusCode,
                message: payload?.message ?? 'Request successful',
                data: payload?.data ?? payload,
            })),
        );
    }
}
