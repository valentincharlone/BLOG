const {connection} = require('./dataBase/connection')
const express = require('express')
const cors = require('cors')

console.log("app")


//Conectar a la db
connection()

//Crear server
const app = express()
const port = 3900

//configurar cors
app.use(cors())

//Convertir body a objeto js
app.use(express.json())
app.use(express.urlencoded({extended: true})) //formato normal

//crear rutas
const routes_article = require('./routes/ArticleRoute')

//cargo rutas
app.use('/api', routes_article)

//rutas de prueba hardcodeadas
// app.get("/probando", (req, res) => {
//     console.log('probandoo')

//     return res.status(200).json({
//         curso: 'Master react',
//         autor: 'valen',
//         url: 'youtube.com'
//     })
// })

app.get("/home", (req, res) => {

    return res.status(200).send(
        "<h1>QUE ONDA GENTE</h1>"
    )
})

//crear sv y escuchar peticiones
app.listen(port, () => {
    console.log('Server corriendo en puerto :' + port)
})