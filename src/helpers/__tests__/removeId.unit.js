import { removeId } from '../removeId'

describe('Unit test of removeId util', () => { 
    it('should remove the id key of a objct', () => {
        const withoutId = removeId({
            id: 'a id'
        })
        expect(withoutId).not.toHaveProperty('id')
    })

    it('should let the others keys untouched', () => {
        const withoutId = removeId({
            id: 'a id',
            foo: 'bar',
        })
        expect(withoutId).not.toHaveProperty('id')
        expect(withoutId).toHaveProperty('foo', 'bar')
    })

    // TODO: make recursive to lists
})