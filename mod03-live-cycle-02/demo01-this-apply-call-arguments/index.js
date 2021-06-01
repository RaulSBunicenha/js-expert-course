'use strict'
const { resolve } = require('path')
const { watch, promises: { readFile } } = require('fs')

// watch(__filename, async (event, filename) => {
    
// })

class File {
    watch (event, filename) {
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }
    
    async showContent (filename) {
        console.log(
            (await readFile(
                resolve(__dirname, filename)
            ))
            .toString()
        )
    }
}

{
    const file = new File()
    // Doing this, "this" is from The Watch Function and not from File Class
    // watch(__filename, file.watch)

    // UGLY WAY to not get "this" from the Watch Function
    // watch(__filename, (event, filename) => file.watch(event, filename))

    // We can use "bind" to explain to the function which "this" should be used
    // "bind" returns a function with a right "this" to be used
    watch(__filename, file.watch.bind(file))

    // Apply and Call we use to define the functions inside "this", in that call
    // The difference between them are that one receives the arguments and another receives an array
    file.watch.call({ showContent: () => console.log('show content by Call Function') }, null, __filename)
    file.watch.apply({ showContent: () => console.log('show content by Apply Function') }, [ null, __filename ])
}