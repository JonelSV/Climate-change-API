// npm init to create JSON package
// npm i cheerio for Cheerio  = parses markup and provides an API for traversing/manipulating the resulting data structure.
// npm i express (backend framework)
// npm i axios (promise-based, http requests)
// npm i -g nodemon

const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
// to call express package functions and start new express application
const app = express()

const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.co.uk/environment/climate-crisis',

    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',

    },

]
const articles = []

newspapers.forEach(newspapers => {
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: newspaper.name,
                })
            })


        })
})

// routing, pass a path '/', request response, res.json to show welcom msg on localhost 8000
app.get('/', (req,res) => {
    res.json('Welcome to my climate change news API')
})


// same as above, but this time, instead of homepage, when /news is accessed, run axios to scrape chosen webiste
// create holder (html)for response from promise axios

app.get('/news', (req,res) => {
    
    // axios.get('https://www.theguardian.com/environment/climate-crisis')
    //     .then((response) => {
    //         const html = response.data
    //         // console.log(html)
    //         const $ = cheerio.load(html)

    //         $('a:contains("climate")', html).each(function () {
    //             const title = $(this).text()
    //             const url = $(this).attr('href')
    //             articles.push({
    //                 title,
    //                 url,
    //             })
    //         })

    //         res.json(articles)
    //     }).catch((err) => console.log(err))
    })

// use callback on port and console log portnum
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// 1. create start script in json.p for nodemon to have it listen for changes at index.js.