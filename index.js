const { default: axios } = require('axios')
const express = require('express')
const port = 3001
const app = express()
require('dotenv').config()

const API_KEY = process.env.API_KEY

const handleRegionNumber = (region) => {
    const add1 = ['br', 'eune', 'euw', 'jp', 'lan', 'na', 'oce', 'tr']
    const add2 = ['las', 'ph', 'sg', 'th', 'tw', 'vn']
    if(add1.includes(region)) return region.concat("1")
    if(add2.includes(region)) return region.concat("2")
    return region
}

app.get('/', (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
app.get('/data', (req, res) => {
    const region = handleRegionNumber(req.query.region)
    const summonerName = req.query.summonerName

    axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {
            "X-Riot-Token": API_KEY
        }
    })
    .then(response => {
        res.send(response.data)
    })
    .catch(error => {
        res.send(error)
    })
})