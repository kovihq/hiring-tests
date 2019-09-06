'use strict'

const mocha = require('mocha')
const mochaPlugin = require('serverless-mocha-plugin')
const wrapped = mochaPlugin.getWrapper('sort', '/handler.js', 'sort')
const { chai } = mochaPlugin
const { describe, before, it } = mocha
const { expect } = chai

describe('Sort', () => {
  before((done) => done())

  it('Should be throw error #1', () => {
    return wrapped.run({})
      .then((response) => {
        expect(response).to.be.empty
      })
      .catch((error) => {
        expect(error).to.be.throw
        expect(error).to.has.property('message')
        expect(error.message).to.be.equal('str.replaceAll is not a function')
      })
  })

  it('Should be throw error #2', () => {
    return wrapped.run(undefined)
      .then((response) => {
        expect(response).to.be.empty
      })
      .catch((error) => {
        expect(error).to.be.throw
        expect(error).to.has.property('message')
        expect(error.message).to.be.equal("Cannot read property 'replaceAll' of undefined")
      })
  })

  it('Should be throw error #3', () => {
    return wrapped.run(null)
      .then((response) => {
        expect(response).to.be.empty
      })
      .catch((error) => {
        expect(error).to.be.throw
        expect(error).to.has.property('message')
        expect(error.message).to.be.equal("Cannot read property 'replaceAll' of null")
      })
  })

  it('Should be throw error #4', () => {
    return wrapped.run([])
      .then((response) => {
        expect(response).to.be.empty
      })
      .catch((error) => {
        expect(error).to.be.throw
        expect(error).to.has.property('message')
        expect(error.message).to.be.equal('str.replaceAll is not a function')
      })
  })

  it('Should be throw error #5', () => {
    return wrapped.run(23)
      .then((response) => {
        expect(response).to.be.empty
      })
      .catch((error) => {
        expect(error).to.be.throw
        expect(error).to.has.property('message')
        expect(error.message).to.be.equal('str.replaceAll is not a function')
      })
  })

  it('Should be valid response #1', () => {
    return wrapped.run('{[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}')
      .then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.be.equal('1, 3, 6, 16')
      })
  })

  it('Should be valid response #2', () => {
    return wrapped.run('{[3, 5, 6, 1, 2, 16], [6, 91, 1, 4, 3, 123, 1, 1]}')
      .then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.be.equal('1, 3, 6')
      })
  })

  it('Should be valid response #3', () => {
    return wrapped.run('[3, 5, 6, 1, 2, 16], [6, 91, 1, 4, 3, 123, 1, 1]')
      .then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.be.equal('1, 3, 6')
      })
  })

  it('Should be valid response #4', () => {
    return wrapped.run('3, 5, 6, 1, 2, 16], [6, 91, 1, 4, 3, 123, 1, 1')
      .then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.be.equal('1, 3, 6')
      })
  })

  it('Should be valid response #5', () => {
    return wrapped.run('3, 5, 6, 1, 2, 16], 6, 91, 1, 4, 3, 123, 1, 1')
      .then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.be.equal('1, 3, 6')
      })
  })

  it('Should be valid response #6', () => {
    return wrapped.run('3, 5, 6, 1, 2, 16, 6, 91, 1, 4, 3, 123, 1, 1')
      .then((response) => {
        expect(response).to.not.be.empty
        expect(response).to.be.equal('1, 3, 6')
      })
  })
})
