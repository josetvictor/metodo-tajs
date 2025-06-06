import { BeforeStep, When, Then } from '@cucumber/cucumber'
import assert from 'node:assert'

let _testServerAddress = ''
let _context = {}

async function createUser(data) {
    const response = await fetch(`${_testServerAddress}/users`, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

async function findUserById(id) {
    const user = await fetch(`${_testServerAddress}/users/${id}`)
    return user.json()
}

BeforeStep(function() {
    _testServerAddress = this.testServerAddress
})

When(`I create a new user with the following details:`, async function(dataTable){
    const [data] = dataTable.hashes()
    console.log
    const response = await createUser(data)
    assert.strictEqual(response.status, 201)
    _context.userData = await response.json()
    assert.ok(_context.userData.id)
})

Then(`I request the API with the user's ID`, async function () {
    const user = await findUserById(_context.userData.id)
    _context.createdUserData = user
})

Then(`I should receive a JSON response with the user's details`, async function() {
    const expectedKeys = [
        'name',
        'birthDay',
        'id',
        'category'
    ]

    assert.deepStrictEqual(
        Object.keys(_context.createdUserData).sort(),
        expectedKeys.sort()
    )
})

Then(`The user's category should be {string}`, async function(expectedCategory){
    assert.strictEqual(_context.createdUserData.category, expectedCategory)
})