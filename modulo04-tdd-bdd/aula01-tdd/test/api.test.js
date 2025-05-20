import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals'

import { server } from '../src/api.js'

/* 
  - Deve cadastrar usuarios e definir uma categoria onde:
      - Jovens Adultos:
        - Usuario de 18-25
      - Adultos:
        - Usuarios de 26-50
      - Ideosos:
        - 51+
      - Menor:
        - Estoura uma erro!
*/

describe('API Users E2E Suite', () => {
    let _testServer
    let _testServerAddress

    function waitForServerStatus(server) {
        return new Promise((resolve, reject) => {
            server.once('error', (err) => reject(err))
            server.once('listening', () => resolve())
        })
    }
    
    function createUser(data) {
        return fetch(`${_testServerAddress}/users`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }
    
    async function findUserById(id) {
        const user = await fetch(`${_testServerAddress}/users/${id}`)
        return user.json()
    }

    beforeAll(async () => {
        _testServer = server.listen()

        await waitForServerStatus(_testServer)

        const serverInfo = _testServer.address()
        _testServerAddress = `http://localhost:${serverInfo.port}`
    })

    afterAll(async () => {
        if (_testServer && _testServer.close) {
            server.closeAllConnections()
            await new Promise(resolve => _testServer.close(resolve))
        }
    })

    it('should register a new user with young-adult category', async () => {
        const expectedCategory = 'young-adult'
        /*
            Importante lembrar que ao utilizar datas temos que levar em conta que o tempo vai passar
            e o teste pode quebrar, uma boa pratica é sempre mockar o tempo!
        */
        jest.useFakeTimers({
            now: new Date('2023-01-01T00:00')
        })
        const response = await createUser({
            name: 'xuxa da silva',
            birthDay: '2000-01-01'
        })
        expect(response.status).toBe(201)

        const result = await response.json()
        expect(result.id).not.toBeUndefined()

        const foundUser = await findUserById(result.id)
        expect(foundUser.category).toStrictEqual(expectedCategory)
    })

    it('should register a new user with adult category', async () => {
        const expectedCategory = 'adult'
        jest.useFakeTimers({
            now: new Date('2023-01-01T00:00')
        })

        const response = await createUser({
            name: 'xuxa da silva',
            birthDay: '1995-01-01'
        })

        expect(response.status).toBe(201)

        const result = await response.json()
        expect(result.id).not.toBeUndefined()

        const foundUser = await findUserById(result.id)
        expect(foundUser.category).toStrictEqual(expectedCategory)
    })

    it('should register a new user with senior category', async () => {
        const expectedCategory = 'senior'
        jest.useFakeTimers({
            now: new Date('2023-01-01T00:00')
        })

        const response = await createUser({
            name: 'xuxa da silva',
            birthDay: '1965-01-01'
        })

        expect(response.status).toBe(201)

        const result = await response.json()
        expect(result.id).not.toBeUndefined()

        const foundUser = await findUserById(result.id)
        expect(foundUser.category).toStrictEqual(expectedCategory)
    })

    it('should throw an error when registering a under-age user', async () => {
        const response = await createUser({
            name: 'silva da silva',
            birthDay: '2018-01-01'
        })

        expect(response.status).toBe(400)
    })
})