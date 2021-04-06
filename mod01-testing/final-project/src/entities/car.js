const Base = require('./base/base')

class Car extends Base {
    constructor({ id, name, releaseYear, available, gasAvaiable }) {
        super({ id, name })
        
        this.releaseYear = releaseYear
        this.available = available
        this.gasAvaiable = gasAvaiable
    }
}

module.exports = Car