const fs = require("fs")

function readJsonFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
}

const writeJsonAndReturn = fileName => data => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data), "utf8", function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(readJsonFile(fileName))
    })
  })
}

module.exports = {
  readJsonFile,
  writeJsonAndReturn
}
