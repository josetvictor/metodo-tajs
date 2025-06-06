import { expect, it, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'
import fs from 'node:fs/promises'

describe('Service Test Suite', () => {
  let _service
  const filename = 'testefile.ndjson'
  beforeEach(() => {
    _service = new Service({filename})
  })

  describe('#read', () => {	
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs,
        fs.readFile.name
      ).mockResolvedValue('')
    
      const result = await _service.read()
      expect(result).toEqual([])
    })

    it('should return users without password if file contains users', async () => {
      const dbData = [
        {
          username: 'josevictor',
          password: '123',
          createdAt: new Date().toISOString()
        },
        {
          username: 'marcos',
          password: '321',
          createdAt: new Date().toISOString()
        }
      ]

      const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('')

      jest
        .spyOn(
          fs,
          'readFile'
        )
        .mockResolvedValue(fileContents)

        // Act
        const result = await _service.read()

        // Assert
        const expected = dbData.map(({password, ...rest}) => ({...rest}))
        expect(result).toEqual(expected)
    })
  })
})