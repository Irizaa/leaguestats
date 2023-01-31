import './App.css';
import React from 'react'
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import styled from 'styled-components'
const App = () => {

  return (
    
    <Router>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/profile' element = {<Profile/>}/>
      </Routes>
    </Router>
  )
}
export default App;
