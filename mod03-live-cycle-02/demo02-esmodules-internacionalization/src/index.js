import Person from './person.js'
import TerminalController from './terminalController.js'

import database from '../database.json'
const DEFAULT_LANG = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController(Person)
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop () {
  try {
    const userInput = await terminalController.question()
    
    if (userInput === STOP_TERMINAL) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return;
    }
    const person = Person.generateInstanceFromString(userInput)
    console.log(person.formatted(DEFAULT_LANG))

    return mainLoop()
  } catch (e) {
    console.error('Something happen**', e)
    return mainLoop()
  }
}

await mainLoop()
