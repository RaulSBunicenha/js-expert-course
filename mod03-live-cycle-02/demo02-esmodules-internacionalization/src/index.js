import Person from './person.js'
import TerminalController from './terminalController.js'

import database from '../database.json'
const DEFAULT_LANG = 'pt-BR'

const terminalController = new TerminalController(Person)

terminalController.initializeTerminal(database, DEFAULT_LANG)
  
const name = await terminalController.question('What is your name?')

console.log('Your name is: ', name)
