const assert = require('assert')

function* calculation (arg1, arg2) {
  yield arg1 * arg2
}

function* main () {
  yield 'Hello'
  yield '-'
  yield 'Word'
  yield* calculation(20, 10)
}

const generator = main()
// next and return
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 'Word', done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ['Hello', '-', 'Word', 200])
assert.deepStrictEqual([...main()], ['Hello', '-', 'Word', 200])

// ---- Async Iterators
const { readFile, stat, readdir } = require('fs/promises')

function* promisified () {
  yield readFile(__filename)
  yield Promise.resolve('Hey dude')
}
// console.log('Destructuring', ...promisified())
// Promise.all([...promisified()]).then(returns => console.log('Promise.all', returns))

// ;(async () => {
//   for await (const item of promisified()) {
//     console.log('For await', item.toString())
//   }
// })()

async function* systemInfo () {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname)
  yield { dir }
}

;(async () => {
  for await (const item of systemInfo()) {
    console.log('For await', item)
  }
})()
