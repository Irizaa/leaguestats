import React from 'react'
import './Home.css'
import styled from 'styled-components'
const Home = () => {
  const LeftSection = styled.div`
  position: absolute;
  left: 0;
  width: 10%;
  height: 100%;
  background-color: #2F2FA2;
`;

const RightSection = styled.div`
  position: absolute;
  right: 0;
  width: 10%;
  height: 100%;
  background-color: #2F2FA2;
`;
  // let searchBar = document.getElementById('search-bar')
  // document.querySelector('form').addEventListener("submit", function(event) {
  //   event.preventDefault()
  //   let query = searchBar.value
  //   window.location.href = "http://localhost:3000/profile/"
  // })
  return (
    <>
    <LeftSection/>
    <RightSection/>
    <div id = 'title'>LEAGUESTATS</div>
    <form action="">
      <div id = 'search-bar-container'>
        <input type="text" id="search-bar" placeholder="Enter summoner name"/>
        <button type="submit" id = "search-button"></button>
      </div>
    </form>
    </>
  )
}

export default Home