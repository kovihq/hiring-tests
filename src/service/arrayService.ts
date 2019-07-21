import { uniq } from 'lodash';

export class ArrayService {

    /**
     * Compare firstArray with secondArray and return a new array with values that are in both arrays.
     * Return of the new array is ascending sorted 
     * 
     * @param firstArray 
     * @param secondArray 
     * 
     * @returns number[]
     */
    public getSameValueOfArrays(firstArray: number[], secondArray: number[]): number[] {

        const gettingItems = (arrayA: number[], arrayB: number[]): number[] => arrayA.filter(a => arrayB.some(b => b === a)).sort((a, b): number => a < b ? -1 : 1);

        const first = uniq(firstArray);
        const second = uniq(secondArray);

        if (firstArray.length < secondArray.length) {
            return gettingItems(first, second);
        }
        return gettingItems(second, first);
    }
}