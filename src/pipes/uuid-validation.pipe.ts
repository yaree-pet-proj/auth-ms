import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {isUUID} from "class-validator";

@Injectable()
export class UuidValidationPipe implements PipeTransform {

    transform(value: any): any {
        if (!isUUID(value.id, 4)) {
            console.log(value);
            throw new BadRequestException('Invalid UUID format');
        }
        return value;
    }

}