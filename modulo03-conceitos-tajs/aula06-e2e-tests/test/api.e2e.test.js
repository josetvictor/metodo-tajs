import { it, expect, describe, beforeAll, afterAll, jest } from '@jest/globals'

function waitForServerStatus(server) {
  return new Promise((resolve, reject) => {
    server.once('error', (err) => reject(err))
    server.once('listening', () => resolve())
  })
}

describe('E2E Test Suite', () => {
  describe('E2e Tests for server in a non-test env', () => {
    it('should start server with PORT 4000', async () => {
      const PORT = 4000
      process.env.NODE_ENV = 'production'
      process.env.PORT = PORT

      jest
        .spyOn(
          console,
          console.log.name
        )

      const { default: server } = await import('../src/index.js')
      await waitForServerStatus(server)

      const serverInfo = server.address()

      expect(serverInfo.port).toBe(4000)
      expect(console.log).toHaveBeenCalledWith(`Server is running at ${serverInfo.address}:${serverInfo.port}`)

      return new Promise(resolve => server.close(resolve))
    })
  })

  describe('E2E Tests for Server', () => {
    let _testServer
    let _testServerAddress

    beforeAll(async () => {
      process.env.NODE_ENV = 'test'
      const { default: server } = await import('../src/index.js')
      _testServer = server.listen()

      await waitForServerStatus(_testServer)

      const serverInfo = _testServer.address()
      _testServerAddress = `http://localhost:${serverInfo.port}`
    })

    afterAll(async () => {
      if (_testServer && _testServer.close) {
        await new Promise(resolve => _testServer.close(resolve))
      }
    })

    it('should return 404 for unsupported routes', async () => {
      const response = await fetch(`${_testServerAddress}/unknown`, { method: 'POST' })
      expect(response.status).toBe(404)
    })

    it('should return 400 and missing file message whe body is invalid', async () => {
      const invalidPerson = { name: 'Fulando da silva' } // Missing cpf

      const response = await fetch(`${_testServerAddress}/persons`, {
        method: 'POST',
        body: JSON.stringify(invalidPerson)
      })
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.validationError).toEqual('cpf is required')
    })

    it('should return 400 and missing file message whe name is null', async () => {
      const invalidPerson = { cpf: '016.546.458-55' } // Missing name

      const response = await fetch(`${_testServerAddress}/persons`, {
        method: 'POST',
        body: JSON.stringify(invalidPerson)
      })
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.validationError).toEqual('name is required')
    })

    it('should return a person created', async () => {
      const expectedPerson = {name: 'Fulano da silva', cpf: '016.444.485-77'}
      const response = await fetch(`${_testServerAddress}/persons`, {
        method: 'POST',
        body: JSON.stringify(expectedPerson)
      })
      expect(response.status).toBe(200)
      expect(response.statusText).toEqual('OK')
    })

    // it('should return 500 and console message', async () => {
    //   const expectedPerson = {name: '', cpf: ''}
    //   const response = await fetch(`${_testServerAddress}/persons`, {
    //     method: 'POST',
    //     body: JSON.stringify(expectedPerson)
    //   })
    //   expect(response.status).toBe(500)
    //   // expect(response.statusText).toEqual('OK')
    // })
  })

  // describe('Teste person class', async () => {
    
  // })
})