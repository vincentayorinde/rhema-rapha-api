import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: unknown, context?: string): void {
    console.log(message, context);
  }

  error(message: unknown, trace?: string, context?: string): void {
    console.log(message, context, trace);
  }

  warn(message: unknown, context?: string): void {
    console.log(message, context);
  }

  debug?(message: unknown, context?: string): void {
    console.log(message, context);
  }

  verbose?(message: unknown, context?: string): void {
    console.log(message, context);
  }
}
