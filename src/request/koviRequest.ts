import { IsOnlyNumberInArray } from '../validation/isOnlyNumberArray';
import { IsArray, ArrayNotEmpty, Validate } from "class-validator";

export class KoviRequest {

    @IsArray()
    @ArrayNotEmpty()
    @Validate(IsOnlyNumberInArray)
    firstArray: number[];


    @IsArray()
    @ArrayNotEmpty()
    @Validate(IsOnlyNumberInArray)
    secondArray: number[];

    constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}