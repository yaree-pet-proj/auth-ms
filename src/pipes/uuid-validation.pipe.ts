import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {isUUID} from "class-validator";

@Injectable()
export class UuidValidationPipe implements PipeTransform {

    transform(value) {
        if (!isUUID(value, 4)) {
            throw new BadRequestException('Invalid UUID format');
        }
        return value;
    }

}