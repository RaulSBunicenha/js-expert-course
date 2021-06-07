import fs from 'fs/promises'

export const save = async (data) => {
  // Does not have __filename or __dirname
  const { pathname: databaseFile } = new URL('../database.json', import.meta.url)
  const currentData = JSON.parse(await fs.readFile(databaseFile))
  currentData.push(data)
  
  await fs.writeFile(databaseFile, JSON.stringify(currentData))
  
  return currentData
}
