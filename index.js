const express = require('express')

const getPayload = require('./getPayload')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/', (req, res) => {
  const response = getPayload(req.body.arr1, req.body.arr2) // Gets the arrays from the message body, sents them to getPayload function and gets the response
  res.json({ response: response }) // Returns the response to the client in json format
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
