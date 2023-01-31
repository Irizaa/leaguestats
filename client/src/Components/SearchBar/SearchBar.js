import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import './SearchBar.css'

const SearchBar = () => {
    const location = useLocation()
    const searchStyling = location.pathname === '/' ? 'home-search-bar-container' : 'profile-search-bar-container'
    const regionStyling = location.pathname === '/' ? 'home-region-selector' : 'profile-region-selector'
    const [username, setUsername] = useState('')
    const [region, setRegion] = useState('na')
    const [selectedRegion, setSelectedRegion] = useState('na')
    const navigate = useNavigate();
  
    const handleSearch = () => {
      navigate(`/profile?region=${region}&username=${username}`)
    }
  
    const handleRegionClick = (region) => {
      setRegion(region)
      setSelectedRegion(region)
    }
    const regionButtons = ['na', 'lan', 'las', 'br', 'euw', 'eune', 'ru', 'tr', 'kr', 'jp', 'ph', 'sg', 'th', 'tw', 'vn', 'oce']
    const firstRowButtons = regionButtons.slice(0, 8)
    const secondRowButtons = regionButtons.slice(8)

    useEffect(() => {
      document.getElementById('profile-region-options').addEventListener('change', function() {
        setRegion(this.value)
      })
    }, [])

  return (
    <div>
        <div id = {searchStyling}>
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
          <button disabled = {username.length === 0} onClick = {handleSearch} id = "search-button"></button>
          <select id= 'profile-region-options' value={region}>
          {regionButtons.map(region => (
            <option
            value = {region}
            >
              {region.toUpperCase()}
            </option>
          ))}
        </select>
        </div>

        <div id = {regionStyling}>
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
        </div> 
    </div>
  )
}

export default SearchBar