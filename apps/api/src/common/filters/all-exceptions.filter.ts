import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { ArgumentsHost, ExceptionFilter } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload =
      exception instanceof HttpException ? exception.getResponse() : "Internal server error";

    const logMessage = exception instanceof Error ? exception.stack ?? exception.message : String(exception);
    this.logger.error(logMessage);

    response.status(statusCode).json({
      success: false,
      statusCode,
      message: typeof payload === "string" ? payload : JSON.stringify(payload),
      timestamp: new Date().toISOString(),
    });
  }
}
