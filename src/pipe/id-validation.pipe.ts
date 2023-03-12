import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import * as mongoose from "mongoose";
import { IdException } from "../exception/id.exception";

@Injectable()
export class IdValidationPipe implements PipeTransform {
    constructor() {}

    transform(value: any, metadata: ArgumentMetadata): any {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new IdException(value);
        }
        return value;
    }
}