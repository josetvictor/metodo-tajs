import {describe, it, expect, jest} from '@jest/globals'
import Person from '../src/person.js'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw error if name is empty', () => {
      const mockInvalidPerson = {
        name: '',	
        cpf: '12345678900'
      }

      const result = () => Person.validate(mockInvalidPerson)
      expect(result).toThrowError('name is required')
    })

    it('should throw error if cpf is empty', () => {
      const mockInvalidPerson = {
        name: 'joãozin',	
        cpf: ''
      }

      const result = () => Person.validate(mockInvalidPerson)
      expect(result).toThrowError('cpf is required')
    })

    it('should not throw person is valid', () => {
      const mockInvalidPerson = {
        name: 'joãozin',	
        cpf: '12345678900'
      }

      const result = () => Person.validate(mockInvalidPerson)
      expect(result).not.toThrow()
    })
  })

  describe('#format', () => {
    it('should format person name and cpf', () => {
      // Dica: Sempre pensar na regras dos AAA quando iniciar um teste

      // Arranger = Preparar
      const mockPerson = {
        name: 'joãozin da silva',
        cpf: '12345678900'
      }
      // Act = Executar
      const formattedPerson = Person.format(mockPerson)

      // Assert = Verificar/Validar
      const expected = {
        fistName: 'joãozin',
        lastName: 'da silva',
        cpf: '12345678900'
      }

      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  // To Do : Implementar case de testes para save
  describe('#save', () => {
    it('should save a valid person', () => {
      // Arrange
      const mockPersonFormatted = {
        cpf: '12345678900',
        fistName: 'joãozin',
        lastName: 'da silva',
      }

      // act
      const result = () => Person.save(mockPersonFormatted)

      // Assert
      expect(result).not.toThrowError()
    })
  })


  describe('#Process', () => {
    it('should process a valid person', () => {
      // Arrange
      const mockPerson = {
        name: 'joãozin da silva',
        cpf: '123.456.789-00'
      }

      jest.spyOn(
        Person,
        Person.validate.name
      ).mockReturnValue()

      jest.spyOn(
        Person,
        Person.format.name
      ).mockReturnValue({
        fistName: 'joãozin',
        lastName: 'da silva',
        cpf: '12345678900'
      })

      //Act
      const result = Person.process(mockPerson)

      //Assert
      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })
})