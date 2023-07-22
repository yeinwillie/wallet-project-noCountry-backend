const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 1237 
const cors = require ('cors')
const { initDBConnection } = require('./data/dbConnection');
const usersRouter = require('./routes/users.routes')
const transactionsRoutes = require ('./routes/transactions.routes')



app.use(express.json())
app.use(cors()) 

app.get('/', (req, res)=>{
    res.send({ mensaje: "Hola Backend" })
})

app.use ('/api/users', usersRouter)
app.use ('/api/transactions', transactionsRoutes)

app.listen(PORT, ()=>{
    initDBConnection();
    console.log(`Escuchando en puerto ${PORT}`)
})