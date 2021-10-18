// npm init to create JSON package
// npm i cheerio for Cheerio  = parses markup and provides an API for traversing/manipulating the resulting data structure.
// npm i express (backend framework)
// npm i axios (promise-based, http requests)
// npm i -g nodemon

const PORT = 8000;
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio');
const { response } = require('express');
// to call express package functions and start new express application
const app = express()

// add base to nespapers objects because a tags on the telegraph results in broken api
// then add on newspapers.push the newspaper.base + url

const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: '',
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.co.uk/environment/climate-crisis',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk/'

    },

]
const articles = []

newspapers.forEach(newspapers => {
    axios.get(newspapers.address)
        .then((response) => {
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspapers.base + url,
                    source: newspapers.name,
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

// app.get('/news', (req,res) => {
    
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
    // })


// New app.get that will return the articles array this time

    app.get('/news', (req, res) => {
        res.json(articles)
    })


// Add new call and now just scraping off one news article. Add : after news followed by newspaper ID , async
// create variable for newspaper ID to hold req.params.newsID. 
// filter throught the newspapers array and return newspaper if it is equal to the newspaperID
    app.get('news/:newspaperId', async (req, res) => {
        // console.log(req.params.newspaperId)

        const newspaperId = req.params.newspaperId
        const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
        axios.get(newspaperAddress)
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)
                const specificArticles = []

                $('a: contains("climate")', html).each (function () {
                    $(this).text()
                })
            })
    })


// use callback on port and console log portNum
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// 1. create start script in json.p for nodemon to have it listen for changes at index.js.