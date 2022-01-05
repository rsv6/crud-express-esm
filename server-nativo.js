const http = require('http')
const fs = require("fs")
const path = require("path")


const hostname = '127.0.0.1'
const port = 3001

const server = http.createServer((req, res) => {
  
  console.log(req.url)
  
  if (req.url === "/api/bananas") {
    req.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain')    // devolver texto simples
    res.end("<center><h1>Banana</center></h1>")
  } else if (req.url === "/") {

    req.statusCode = 200
    const home = path.join(__dirname, "public", "home.html")
    fs.readFile(home, "utf8", (err, data) => {
      if(err) throw err
      console.log(data)
      res.end(data)
    })

  } else {
    const file = path.join(__dirname, "public", req.url)
    fs.readFile(file, "utf8", (err, data) => {
      if(err) {
        console.dir(err)
      } 
      console.log(data)
      res.end(data)
    })
  }
  
  
  
  // else {
  //   res.end(JSON.stringify({ titulo: 'rota inexistente' }))
  // }


})

server.listen(port, hostname, console.log(`Server running at http://${hostname}:${port}`))