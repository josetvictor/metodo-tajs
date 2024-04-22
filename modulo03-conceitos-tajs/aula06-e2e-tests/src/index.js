import server from "./server.js"

if(process.env.NODE_ENV !== 'test') {
  server.listen(3000, () => {
    const serverInfo = server.address()
    console.log(`Server is running at ${serverInfo.address}:${serverInfo.port}`)
  })
}

export default server

/*
  curl -i -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name": "Zezin da Silva", "cpf": "123.456.789-00"}' \
  http://localhost:3000/person
*/ 