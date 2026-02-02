import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  function getData(){
    alert("hii inside get");
  }

  return (
    <>
      <h2>Welcome</h2>
      <button onClick={getData} >FetfchData</button>
    </>
  )
}

export default App
