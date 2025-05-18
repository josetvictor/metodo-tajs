import { expect, it, describe, beforeEach, jest } from '@jest/globals'
import Service from '../src/service.js'
import crypto from 'crypto'
import fs from 'node:fs/promises'

describe('Service Test Suite', () => {
  let _service
  const filename = 'testefile.ndjson'
  const MOCKED_HASH_ENCRYPT = 'b10a8db164e0754105b7a99be72de3fa'
  
  describe('#create - spies', () => {
    beforeEach(() => {
      jest
        .spyOn(
          crypto,
          crypto.createHash.name
        )
        .mockReturnValue({
          update: jest.fn().mockReturnThis(),
          digest: jest.fn().mockReturnValue(MOCKED_HASH_ENCRYPT)
        })

      jest
        .spyOn(
          fs,
          fs.appendFile.name
        )
        .mockResolvedValue()

      _service = new Service({filename})
    })

    it('should call appendFile with rigth params', async () => {
      // AAA - Arrange, Act, Assert
      const input = {
        username: 'user',
        password: '123'
      }

      const expectedCreatedAt = new Date().toISOString()
      // Arrange
      // create stub to datetime
      jest
        .spyOn(
          Date.prototype,
          Date.prototype.toISOString.name
        )
        .mockReturnValue(expectedCreatedAt)

        //Act
        const result = await _service.create(input)

        // Assert
        expect(crypto.createHash).toHaveBeenCalledWith('sha256')

        const hash = crypto.createHash('sha256')
        expect(hash.update).toHaveBeenCalledWith(input.password)
        expect(hash.digest).toHaveBeenCalledWith('hex')

        const expected = JSON.stringify({
          ...input,
          createdAt: expectedCreatedAt,
          password: MOCKED_HASH_ENCRYPT
        }).concat('\n')

        expect(fs.appendFile).toHaveBeenCalledWith(filename, expected)
    })

  })
})