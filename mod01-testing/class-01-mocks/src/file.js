const { readFile } = require('fs/promises')
const { join } = require('path')
const User = require('../tests/user')
const constants = require('./constants')
const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJson (filePath) {
        let csvString = await File.getFileContent(filePath)
        csvString = File.cleanCSVString(csvString)
        File.isValid(csvString)

        return this.parseCSVToJson(csvString)
    }

    static cleanCSVString (csvString) {
        return csvString.replace(/\r/g, '')
    }

    static async getFileContent (filePath) {
        const fileName = join(__dirname, filePath)
        return (await readFile(fileName)).toString('utf8')
    }

    static isHeaderValid (header, fields) {
        const validation = header.trim() === fields.join(',')
        if (!validation) throw new Error(constants.error.FILE_FIELDS_ERROR_MESSAGE)
    }

    static isLinesLengthValid (lines, maxLines) {
        const validation = lines.length > 0 && lines.length <= maxLines
        if (!validation) throw new Error(constants.error.FILE_LENGTH_ERROR_MESSAGE)
    }

    static isValid (csvString, options = DEFAULT_OPTIONS) {
        const [header, ...lines] = csvString.split('\n')
        this.isHeaderValid(header, options.fields)
        this.isLinesLengthValid(lines, options.maxLines)

        return true
    }

    static parseCSVToJson (csvString) {
        let lines = csvString.split('\n')
        const header = lines.shift().split(',')
        return lines.map(line => {
            const columns = line.split(',')
            let user = {}
            for (const index in columns) user[header[index]] = columns[index]
            return new User(user)
        })
    }
}

module.exports = File