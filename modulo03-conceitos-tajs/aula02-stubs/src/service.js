import crypto from 'node:crypto'
import fs from 'node:fs/promises'

export default class Service {
  #fileName
  constructor({ filename }) {
    this.#fileName = filename
  }

  #hasPassWord(password) {
    const hash = crypto.createHash('sha256')
    hash.update(password)

    return hash.digest('hex')
  }

  create({username, password}) {
    const data = JSON.stringify({
      username,
      password: this.#hasPassWord(password),
      createdAt: new Date().toISOString()
    }).concat('\n')

    return fs.appendFile(this.#fileName, data)
  }

  async read() {
    const lines = (await fs.readFile(this.#fileName, 'utf8'))
          .split('\n')
          .filter(line => !!line)

    if(!lines.length) return []

    return lines
            .map(line => JSON.parse(line))
            .map(({password, ...rest}) => ({...rest}))
  }
}