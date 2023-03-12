import { HttpException, HttpStatus } from "@nestjs/common";

export class IdException extends HttpException {
    constructor(id: string, cause?: Error) {
        super(`Id '${id}' is not valid`, HttpStatus.BAD_REQUEST, { cause });
    }
}