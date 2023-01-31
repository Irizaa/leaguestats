import { React, useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar'
import styled from 'styled-components'
import './Profile.css'

const Profile = () => {
    const UpperSection = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 10%;
    background-color: #2F2FA2;`
    
    const [username, setUsername] = useState('')
    const [region, setRegion] = useState('')
    const navigate = useNavigate()

    const validRegions = ['na', 'lan', 'las', 'br', 'euw', 'eune', 'ru', 'tr', 'kr', 'jp', 'ph', 'sg', 'th', 'tw', 'vn', 'oce']
    
    const getUserInfo = () => {
        const params = new URLSearchParams(window.location.search)
        const regionInput = params.get('region')
        if(!validRegions.includes(regionInput)) {
            navigate('/')
        }
        const usernameInput = params.get('username')
        if(usernameInput){
            setUsername(usernameInput)
        }
        setRegion(regionInput)
    }
    useEffect(() => {
        getUserInfo()
    })
    
    return (
        <div>
            <UpperSection/>
            <SearchBar/>
        </div>
    )
}

export default Profile