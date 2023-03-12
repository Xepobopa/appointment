import { HttpException, HttpStatus } from "@nestjs/common";

export class AppointmentException extends HttpException {
    constructor(description: string, cause?: Error) {
        super(`Exception in appointment. ${description}`, HttpStatus.BAD_REQUEST, { cause, description });
    }
}