const processMessage = require('../processMessage')

describe('processMessage function', () => {
    it('should return a array', () => {
        const message = {
            messageId:'18-3-5-6-22-1-2-32.1-9-12-14',
            input: [
                [18,3,5,6,22,1,2,32],
                [1, 9, 12, 14]
            ]
        }
        expect(processMessage(message)).toBeInstanceOf(Array)
    })

    it('should return unique items', () => {
        const message = {
            messageId:'18-3-5-6-22-1-2-32.1-9-12-14',
            input: [
                [1],
                [1]
            ]
        }
        expect(processMessage(message)).toMatchObject([1])
    })

    it('should return the intersected items', () => {
        const message = {
            messageId:'18-3-5-6-22-1-2-32.1-9-12-14',
            input: [
                [1,2,3],
                [1, 5, 6]
            ]
        }
        expect(processMessage(message)).toMatchObject([1])
    })

    it('should the array be sorted', () => {
        const message = {
            messageId:'18-3-5-6-22-1-2-32.1-9-12-14',
            input: [
                [2,3],
                [3, 2, 5, 6]
            ]
        }
        expect(processMessage(message)).toMatchObject([2, 3])
    })
})