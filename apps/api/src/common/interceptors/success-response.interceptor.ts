import type { ApiSuccess } from "@crowdtolive/shared";
import { Injectable } from "@nestjs/common";
import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, type Observable } from "rxjs";

@Injectable()
export class SuccessResponseInterceptor<T>
  implements NestInterceptor<T, ApiSuccess<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccess<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
