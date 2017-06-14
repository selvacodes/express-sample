const express = require("express")
const http = require("http")
const path = require("path")
const bodyParser = require("body-parser")

const { readJsonFile, writeJsonAndReturn } = require("./file")
const {
  addGod,
  selectGod,
  pickGods,
  makeGodsObject,
  makeGodFromRequest
} = require("./gods/gods")

const FILE_GODS = "./gods/gods.json"
const PORT = 4000

const app = express()
const httpServer = http.Server(app)

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res) {
  res.send("Express server is up")
})

app.get("/gods", function(req, res) {
  readJsonFile(FILE_GODS).then(val => res.json(val))
})

app.get("/god/:godId", function(req, res) {
  readJsonFile(FILE_GODS)
    .then(pickGods)
    .then(selectGod(req.params.godId))
    .then(val => res.json(val))
})

app.post("/god/add", function(req, res) {
  const newGod = makeGodFromRequest(req)
  readJsonFile(FILE_GODS)
    .then(pickGods)
    .then(addGod(newGod))
    .then(makeGodsObject)
    .then(writeJsonAndReturn(FILE_GODS))
    .then(val => res.json(val))
})

app.listen(PORT)

console.log(`gods served @ ${PORT}`)
