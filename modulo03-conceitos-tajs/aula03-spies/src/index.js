import Service from "./service.js"

const data = {
  username: `josevictor-${Date.now()}`,
  password: 'senha123'
}

const service = new Service({
  filename: './users.ndjson'
})

await service.create(data)

const users = await service.read()
console.log('users', users)