const { default: axios } = require('axios')
const express = require('express')
const port = 3001
const app = express()
require('dotenv').config()

const API_KEY = process.env.API_KEY

const handleRegionNumber = (region) => {
    if(region == 'oce') return 'oc1'
    const add1 = ['br', 'eune', 'euw', 'jp', 'lan', 'na', 'tr']
    const add2 = ['las', 'ph', 'sg', 'th', 'tw', 'vn']
    if(add1.includes(region)) return region.concat("1")
    if(add2.includes(region)) return region.concat("2")
    return region
}
const handleRegionArea = (region) => {
    if(region == 'br' || region == 'lan' || region == 'na' || region == 'las') return 'americas'
    if(region == 'eune' || region == 'euw' || region == 'tr' || region == 'ru') return 'europe'
    if(region == 'jp' || region == 'kr' || region == 'oce') return 'asia'
    if(region == 'ph' || region == 'sg' || region == 'tw' || region == 'th' || region == 'vn') return 'sea'
}
const getData = async (url) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
app.get('/', (req, res) => {
    res.send("Hello world!")
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
app.get('/data', (req, res) => {
    const regionArea = handleRegionArea(req.query.region)
    const region = handleRegionNumber(req.query.region)
    const summonerName = req.query.summoner_name
    let ret = {}
    const getSummonerData = async (summonerName, region) => {
        
        axios.defaults.headers['X-Riot-Token'] = API_KEY
        axios.defaults.baseURL = `https://${region}.api.riotgames.com/lol`

        const basicInfo = await getData(`/summoner/v4/summoners/by-name/${summonerName}`)
        ret.region = region
        ret.summonerName = summonerName
        ret.summonerId = basicInfo.id
        ret.profileIconId = basicInfo.profileIconId
        ret.summonerLevel = basicInfo.summonerLevel
        ret.puuid = basicInfo.puuid

        const rankedInfo = await getData(`/league/v4/entries/by-summoner/${ret.summonerId}`)
        for(let i = 0 ; i < rankedInfo.length; i++) {
            if(rankedInfo[i].queueType == 'RANKED_SOLO_5x5') ret.soloStats = rankedInfo[i]
            if(rankedInfo[i].queueType = 'RANKED_FLEX_SR') ret.flexStats = rankedInfo[i]
        }
        const masteryInfo = await getData(`/champion-mastery/v4/champion-masteries/by-summoner/${ret.summonerId}`)
        ret.masteryData = masteryInfo.map(champion => ({champion : champion.championId, level : champion.championLevel, 
        points : champion.championPoints, pointsUntilNext : champion.championPointsUntilNextLevel}))

        const matchIds = await getData(`https://${regionArea}.api.riotgames.com/lol/match/v5/matches/by-puuid/${ret.puuid}/ids`)
        ret.matchIds = matchIds

        return ret
    }
    getSummonerData(summonerName, region).then(result => {
        res.send(result)
    })
})
// id, profileIconId, summonerLevel