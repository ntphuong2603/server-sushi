const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const server = express()
server.use(bodyParser.json())
server.use(cors());

const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`Node server is running on ${port}`);
})