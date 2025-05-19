export default function mapPerson(personStr){
  const { name, age } = JSON.parse(personStr)

  return {
    name,
    age,
    createAt: new Date()
  }
}