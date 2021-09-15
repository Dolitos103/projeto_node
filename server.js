const http = require('http')
const express = require ('express')
const bodyParser = require ('body-parser')

let contador = 3
let clientes = [
    {
        id:1,
        nome: 'João',
        email: 'joao@email.com'
    },
    {
        id:2,
        nome: 'Cristina',
        email: 'cristina@email.com'
    }
]

const app = express()
app.use(bodyParser.json())
const porta = 3000
app.set('port', porta)

//localhost:3000/clientes (POST)
app.post('/clientes', (req, res) => {
    const cliente = {
        id: contador++,
        nome: req.body.nome,
        email: req.body.email
    }
    clientes.push(cliente)
    res.status(201).json(clientes)
})

app.get('/removeClientes', (req, res) => {

    clientes.shift(req.query.id)
    res.status(201).json(clientes)
})

app.get('/subClientes', (req, res) => {

    for(let i = 0; i < clientes.length ; i++){
        if(clientes[i].id == req.query.id){
            clientes[i].nome = req.query.nome
            clientes[i].email = req.query.email 
        }
    }
    res.status(201).json(clientes)
})


//localhost:3000/clientes (GET)
app.get('/clientes', (req, res) => {
    res.json(clientes)
})


//localhost:3000/teste (GET)
app.get ('/teste', (req, res) => {
    console.log ("Passando por aqui...")
    res.send ('Olá!')
})




const server = http.createServer(app)
server.listen(porta)