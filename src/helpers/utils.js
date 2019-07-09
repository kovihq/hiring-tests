function intersect(arr1, arr2) {
    return arr1
        .filter(item => arr2.includes(item))
        .sort((a, b) => a > b);
}

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