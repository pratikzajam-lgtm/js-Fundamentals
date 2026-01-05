import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class CreateUserValidationFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const exceptionResponse = exception.getResponse() as any;

        const errors: Record<string, string[]> = {};

        if (Array.isArray(exceptionResponse.message)) {
            exceptionResponse.message.forEach((msg: string) => {
                const field = msg.split(' ')[0];
                errors[field] = errors[field] || [];
                errors[field].push(msg);
            });
        }

        response.status(400).json({
            statusCode: 400,
            message: 'All Fields Are Required',
            data: null
        });
    }
}
