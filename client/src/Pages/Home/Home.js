import React, { useEffect, useState } from 'react'
import './Home.css'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const LeftSection = styled.div`
  position: absolute;
  left: 0;
  width: 10%;
  height: 100%;
  background-color: #2F2FA2;`

  const RightSection = styled.div`
  position: absolute;
  right: 0;
  width: 10%;
  height: 100%;
  background-color: #2F2FA2;`

  const [username, setUsername] = useState('')
  const [region, setRegion] = useState('na')
  const [selectedRegion, setSelectedRegion] = useState('na')
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/profile/${region}/${username}`)
  }

  const handleRegionClick = (region) => {
    setRegion(region)
    setSelectedRegion(region)
  }
  const regionButtons = ['na', 'lan', 'las', 'br', 'euw', 'eune', 'ru', 'tr', 'kr', 'jp', 'ph', 'sg', 'th', 'tw', 'vn', 'oce']
  const firstRowButtons = regionButtons.slice(0, 8)
  const secondRowButtons = regionButtons.slice(8)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        entry.target.classList.toggle('show', entry.isIntersecting);
      })
    })
  const hiddenElements = document.querySelectorAll('.hidden')
  hiddenElements.forEach((el) => observer.observe(el))
  })

  return (
    <>
      <LeftSection/>
      <RightSection/>
      <div className = "hidden">
        <div id = 'title'>LEAGUESTATS</div>

        <div id = 'search-bar-container'>
          <input 
          id = "search-bar"
          type = "text"
          value = {username}
          placeholder="Enter summoner name"
          onChange={e => setUsername(e.target.value)}
          onKeyDown = {e => {
            if(e.key === 'Enter' && username.length > 0) {
              handleSearch()
            }
          }}/>
          <button disabled={username.length === 0} onClick = {handleSearch} id = "search-button"></button>
        </div>

        <div id = 'region-selector'>
          {firstRowButtons.map(region => (
           <button
           className = 'region-button'
            key = {region}
            style = {{backgroundColor: selectedRegion === region ? '#F64C72' : '#2F2FA2'}}
            onClick = {() => handleRegionClick(region)}
            >
              {region.toUpperCase()}
            </button>
          ))}
          <br/>
          {secondRowButtons.map(region => (
           <button
            className='region-button'
            key = {region}
            style = {{backgroundColor: selectedRegion === region ? '#F64C72' : '#2F2FA2'}}
            onClick = {() => handleRegionClick(region)}
            >
              {region.toUpperCase()}
            </button>
          ))}
          {/* <button className = 'region-button' onClick = {() => setRegion('na')}>NA</button>
          <button className = 'region-button' onClick = {() => setRegion('lan')}>LAN</button>
          <button className = 'region-button' onClick = {() => setRegion('las')}>LAS</button>
          <button className = 'region-button' onClick = {() => setRegion('br')}>BR</button>
          <button className = 'region-button' onClick = {() => setRegion('euw')}>EUW</button>
          <button className = 'region-button' onClick = {() => setRegion('eune')}>EUNE</button>
          <button className = 'region-button' onClick = {() => setRegion('ru')}>RU</button>
          <button className = 'region-button' onClick = {() => setRegion('tr')}>TR</button>
          <br/>
          <button className = 'region-button' onClick = {() => setRegion('kr')}>KR</button>
          <button className = 'region-button' onClick = {() => setRegion('jp')}>JP</button>
          <button className = 'region-button' onClick = {() => setRegion('ph')}>PH</button>
          <button className = 'region-button' onClick = {() => setRegion('sg')}>SG</button>
          <button className = 'region-button' onClick = {() => setRegion('th')}>TH</button>
          <button className = 'region-button' onClick = {() => setRegion('tw')}>TW</button>
          <button className = 'region-button' onClick = {() => setRegion('vn')}>VN</button>
          <button className = 'region-button' onClick = {() => setRegion('oce')}>OCE</button>
          */}
        </div> 
      </div>
    </>
  )
}

export default Home