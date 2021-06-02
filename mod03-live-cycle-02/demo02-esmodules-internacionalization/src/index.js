import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'

import database from '../database.json'

DraftLog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.cyan("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("Km Traveled") },
    { field: "from", name: chalk.cyan("From") },
    { field: "to", name: chalk.cyan("To") }
  ]
}

const table = chalkTable(options, database)

const print = console.draft(table)

// setInterval(() => {
//   database.push({ id: 'raul123', from: 'raul123' })
//   const table = chalkTable(options, database)
//   print(table)
// }, 3000)

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

// terminal.question('What is you name? ', msg => {
//   console.log('The name is: ', msg)
// })
