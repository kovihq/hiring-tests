const processMessage = require('../processMessage')

describe('processMessage function', () => {
    const parameters = [
        {
            description: 'should return a array',
            input: [
                [18,3,5,6,22,1,2,32],
                [1, 9, 12, 14]
            ],
            assertion: 'toBeInstanceOf',
            params: [Array] 

        },
        {
            description: 'should return unique items',
            input: [
                [1],
                [1]
            ],
            assertion: 'toMatchObject',
            params: [[1]] 
        },

        {
            description: 'should return only the intersected items',
            input: [
                [1,2,3],
                [1, 5, 6]
            ],
            assertion: 'toMatchObject',
            params: [[1]] 
        },

        {
            description: 'should the array be sorted',
            input: [
                [2,3],
                [3, 2, 5, 6]
            ],
            assertion: 'toMatchObject',
            params: [[2, 3]] 
        },

    ]
    parameters.map(({
        description,
        input,
        assertion,
        params
    }) => it(description, () => {
         const message = {
            messageId:'18-3-5-6-22-1-2-32.1-9-12-14',
            input,
        }
        expect(processMessage(message))[assertion](...params)
    }))
})