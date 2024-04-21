import { describe, it, expect } from '@jest/globals'
import mapPerson from '../src/person.js'

describe('#Person Test Suite', () => {
  it('happy path', () => {
    const person = '{"name": "joãozin da silva", "age": 30 }'
    const personObj = mapPerson(person)

    expect(personObj).toEqual({
      name: 'joãozin da silva',
      age: 30,
      createAt: expect.any(Date)
    })
  })

  describe('what coverage doesnt tell you', () => {
    it('should not map person give invalid JSON string', () => {
      const personStr = '{"name":'

      expect(() => mapPerson(personStr))
      .toThrow('Unexpected end of JSON input')
    })

    it('should not map person give invalid JSON data', () => {
      const personStr = '{}'
      const personObj = mapPerson(personStr)

      expect(personObj)
      .toEqual({
        name: undefined,
        age: undefined,
        createAt: expect.any(Date)
      })
    })
  })

})