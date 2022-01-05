const fs = require("fs")
const path = require("path")

const home = path.join(__dirname, "public", "home.html")
fs.readFile(home, "utf8", (err, data) => {
  if(err) throw err
  console.log(data)
})