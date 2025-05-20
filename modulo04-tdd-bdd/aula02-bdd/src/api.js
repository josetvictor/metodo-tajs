import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import { createServer } from 'node:http'

const db = []

function getUserCategory(birthDay) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - (new Date(birthDay).getFullYear())

    if (age < 18) throw new Error('User must be 18yo or older')

    if (age >= 18 && age <= 25) return 'young-adult'
    if (age >= 26 && age <= 50) return 'adult'
    if (age >= 51) return 'senior'
}

const server = createServer(async (request, response) => {
    try {
        if (request.url === '/users' && request.method === 'POST') {
            const user = JSON.parse(await once(request, 'data'))
            const updatedUser = {
                ...user,
                id: randomUUID(),
                category: getUserCategory(user.birthDay)
            }
            db.push(updatedUser)
            response.writeHead(201, {
                'Content-Type': 'application/json'
            })
            response.end(JSON.stringify({
                id: updatedUser.id
            }))
            return;
        }

        if (request.url.startsWith('/users') && request.method === 'GET') {
            const [, , id] = request.url.split('/')
            const user = db.find(user => user.id === id)

            response.end(JSON.stringify(user))
            return;
        }

    } catch (error) {
        if(error.message.includes('18yo')){
            response.writeHead(400, {
                'Content-type': 'application/json'
            })
            response.end(JSON.stringify({
                message: error.message
            }))
            return;
        }
        response.writeHead(500)
        response.end('deu ruim!')
    }

    response.end('hello world!')
})

export { server }