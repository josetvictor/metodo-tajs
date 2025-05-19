import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import Task from '../src/tasks.js'
import { setTimeout } from 'node:timers/promises'

describe('Task Test Suite', () => {
  let _logMock
  let _task
  beforeEach(() =>{
    _logMock = jest.spyOn(
      console,
      console.log.name
    ).mockImplementation()

    _task = new Task()
  })

  //Como NÃO fazer

  it.skip('should only run tasks that are due without fake timers (slow)', async () => {
    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000), // 5 secs
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000), // 10 secs
        fn: jest.fn()
      }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200)

    await setTimeout(11e3) // 11_000
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  },
    // configurar para o jest aguardar 15 segundos nesse teste
    15e3
  )

  // Como fazer
  it('should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers()
    // Arrange
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5000),
        fn: jest.fn()
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10000),
        fn: jest.fn()
      }
    ]

    // Act
    _task.save(tasks.at(0))
    _task.save(tasks.at(1))

    _task.run(200) // 200ms

    jest.advanceTimersByTime(4000)

    // ninguém deve ser executado ainda!
    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    // 4 + 2 = 6 => só a primeira tarefa deve ser executada
    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000)

    // 4 + 2 + 4 = 10 => a segunda tarefa deve ser executada
    expect(tasks.at(1).fn).toHaveBeenCalled()

    jest.useRealTimers()
  })
})