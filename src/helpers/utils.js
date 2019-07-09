/**
* @author Vitor Ferreira Garcia <vitfgarcia@gmail.com>
* @param {*} arr1 
* @param {*} arr2 
* 
* @description Function that receives n arrays and returns numbers 
*              that intersect on all arrays sorted by lower to higher  
*/
function intersect(arr1, arr2) {
    return arr1
        .filter(item => arr2.includes(item))
        .sort((a, b) => a > b);
}

/**
 * @author Vitor Ferreira Garcia <vitfgarcia@gmail.com>
 * @param {*} event 
 * 
 * @description Function that receives an event on SQS format and
 *              parses it to the format needed to intersect  
 */
function parseEvent(event) {
    if (!event || !event.Records) {
        return [];
    }

    return event.Records
        .map(record => record.body)
        .filter(body => Array.isArray(body));
}

module.exports = {
    parseEvent,
    intersect
};