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
      const personSaved = Person.save(mockPersonFormatted)
      
      // Assert
      expect(personSaved.message).toEqual('Created Success');
      expect(personSaved.statusCode).toEqual(200);
    })
  })


  describe('#Process', () => {
    it('should process a valid person', () => {
      // Uma outra ideia é não retestar o que já foi testado

      // lembra dos checkpoints?
      // Testou do caminho A ao caminho B,
      //  agora testa o caminho B ao C
      // Então aqui eu pulo o caminho A (validate), caminho B (format)
      // e vou direto para o caminho C (save) pois estes caminhos já foram validados

      // Este método abaixo faz mais sentido para quando se tem interações externas como
      // chaamdas de API, bancos de dados, etc (que será mostrado na proxima aula)

      // Mocks são simulações de frunções que você pode fazer ao testar o comportamento!!

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