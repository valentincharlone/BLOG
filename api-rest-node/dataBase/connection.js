const mongoose = require('mongoose')

const connection = async () => {
    try {
        
        await mongoose.connect('mongodb://localhost:27017/blog')

        console.log('conecting true')

    } catch (error) {
        console.log(error)
        throw new Error ('No se pudo conectara')
    }
}

module.exports = {
    connection
}