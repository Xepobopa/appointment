import { HttpException, HttpStatus } from "@nestjs/common";

export class UserException extends HttpException {
    constructor(user: string, cause?: Error) {
        super(`Can't find user '${user}'`, HttpStatus.BAD_REQUEST, { cause });
    }
}