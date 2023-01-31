import React, { useEffect } from 'react'
import './Home.css'
import SearchBar from '../../Components/SearchBar/'
import styled from 'styled-components'
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
        <div id = 'search-container'>
          <SearchBar/>
        </div>
      </div>
    </>
  )
}

export default Home