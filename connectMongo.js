const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Bem vindo a API!")
    } catch (error) {
        console.log("Conecxão falhou " + error.message )
    }
}

module.exports = connectDB