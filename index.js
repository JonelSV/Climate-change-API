// npm init to create JSON package
// npm i cheerio for Cheerio  = parses markup and provides an API for traversing/manipulating the resulting data structure.
// npm i express (backend framework)
// npm i axios (promise-based, http requests)
// npm i -g nodemon

const PORT = 8000;
const express = require('express')
const axios = require('axios')


// to call express package functions and start new express application
const app = express()

// use callback on port and console log portnum
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// 1. create start script in json.p for nodemon to have it listen for changes at index.js.