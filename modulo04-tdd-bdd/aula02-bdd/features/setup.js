import { Given, AfterAll } from '@cucumber/cucumber'
import { server } from '../src/api.js'
import sinon from 'sinon'

let _testServer

function waitForServerStatus(server) {
    return new Promise((resolve, reject) => {
        server.once('error', (err) => reject(err))
        server.once('listening', () => resolve())
    })
}

AfterAll(async () => {
    sinon.restore()
    if (_testServer && _testServer.close) {
        server.closeAllConnections()
        await new Promise(resolve => _testServer.close(resolve))
    }
})

Given('I have a running server', async function () {
    if(_testServer) return;
    
    _testServer = server.listen()

    await waitForServerStatus(_testServer)

    const serverInfo = _testServer.address()
    this.testServerAddress = `http://localhost:${serverInfo.port}`
})

Given('The current date is {string}', async function (date) {
    sinon.restore()
    const clock = sinon.useFakeTimers(new Date(date).getTime())
    this.clock = clock
})