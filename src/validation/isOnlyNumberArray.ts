import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

/**
 * Validated if the array is only number
 */
@ValidatorConstraint({ name: "IsOnlyNumberInArray", async: false })
export class IsOnlyNumberInArray implements ValidatorConstraintInterface {

    validate(array: number[], args?: ValidationArguments) {
        args;
        if (!array || !(array instanceof Array)) {
            return false;
        }
        return !array.some(item => isNaN(item))
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property}: must be an array of only number.`;
    }

}