import { BeforeStep, Then, When } from '@cucumber/cucumber'
import assert from 'node:assert'

let _context = {}

async function createUser(data) {
    const response = await fetch(`${this.testServerAddress}/users`, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

When(`I create a young user with the following details:`, async function(dataTable){
    const [data] = dataTable.hashes()
    console.log
    const response = await createUser(data)
    _context.responseError = await response.json()
})

// Then(`I should receive an error message that the {string}`, async function (messageError) {
//     assert.deepEqual(_context.responseError.message, messageError)
// })