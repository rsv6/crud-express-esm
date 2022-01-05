const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')
const Usuario = require("./usuario")
const UsuarioService = require("./usuario-service")

var usuarioService = new UsuarioService()

// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

var requestTime = function (req, res, next) {
  req.requestTime = {time: Date.now()}  // cria variavel de sessao no 'req'
  next()
} 

app.use(myLogger)
app.use(requestTime)

// app.get('/', (req, res) => {
//   const home = path.join(__dirname, "public", "home.html")
//   res.sendFile(home)
// })

// Get all users:
app.get('/usuario', (req, res) => {
  res.json(usuarioService.buscarTodos())
})


// Add user in database:
app.post('/usuario', (req, res) => {

  let usuario = new Usuario(req.body.email, req.body.nome, req.body.senha, req.requestTime)
  usuarioService.adicionar(usuario)
  res.json(usuario)
})

app.put('/usuario', (req, res) => {
  // Creating obj:
  // let usuario = {
  //   email: req.body.email, 
  //   nome: req.body.nome, 
  //   senha: req.body.senha
  // }

  let usuario = req.body

  // Parsing object for method the class:
  usuarioService.alterar(usuario)
  res.send("Alterado!")
})

app.delete('/usuario', (req, res) => {

  usuarioService.excluir(req.body.email)
  res.send("Excluido!")
})

app.listen(port, console.log(`Server running at http://localhost:${port}`))