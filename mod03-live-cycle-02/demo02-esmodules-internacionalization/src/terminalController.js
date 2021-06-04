import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'

export default class TerminalController {
  constructor (
    PersonClass
  ) {
    this.PersonClass = PersonClass
    this.print = {}
    this.terminal = {}
    this.data = []
  }

  initializeTable (database, lang) {
    this.data = database.map(
      e => new this.PersonClass(e).formatted(lang)
    )
    
    this.print = console.draft(chalkTable(
      this.getTableOptions(),
      this.data
    ))
  }

  getTableOptions () {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") }
      ]
    }
  }

  initializeTerminal (database, lang) {
    DraftLog(console).addLineListener(process.stdin)

    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, lang)
  }
  
  closeTerminal () {
    this.terminal.close()
  }

  question (msg = '') {
    return new Promise(resolve => this.terminal.question(`${msg} `, resolve))    
  }
}
