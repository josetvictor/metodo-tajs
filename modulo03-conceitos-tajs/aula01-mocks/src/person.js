class Person {
  static validate(person){
    if(!person.name) throw new Error('name is required')
    if(!person.cpf) throw new Error('cpf is required')
  }

  static format(person){
    const [fistName, ...lastName] = person.name.split(' ')
    return {
      cpf: person.cpf.replace(/\D/g, ''),
      fistName,
      lastName: lastName.join(' ')
    }
  }

  static save(person){
    if(!['cpf', 'fistName', 'lastName'].every(prop => person[prop])) 
      throw new Error(`cannot save a invalid person: ${JSON.stringify(person)}`)

      // Processamento de algum banco de dados, api, etc...

      console.log('Created Success!', person)
  }

  static process(person){
    this.validate(person)
    const formattedPerson = this.format(person)
    return 'ok'
  }
}

// Person.process({
//   name: 'Zezin da Silva', 
//   cpf: '12345678900'
// })

export default Person