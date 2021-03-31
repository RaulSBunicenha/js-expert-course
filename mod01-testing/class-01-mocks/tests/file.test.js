const { rejects, deepStrictEqual } = require('assert')
const { error } = require('../src/constants')
const File = require('../src/file')
const successExpected = [
  {
    "id": 123,
    "name": "Erick Wendel",
    "profession": "Javascript Instructor",
    "birthYear": 1996
  },
  {
    "id": 234,
    "name": "Raul Bunicenha",
    "profession": "Javascript Developer",
    "birthYear": 1996
  },
  {
    "id": 321,
    "name": "Renata",
    "profession": "Nurse",
    "birthYear": 1994
  }
];

(async () => {
    {
        const filePath = '../mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }

    {
        const filePath = '../mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }

    {
        const filePath = '../mocks/invalid-header.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }

    {
        const filePath = '../mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        deepStrictEqual(JSON.stringify(result), JSON.stringify(successExpected))
    }
})()