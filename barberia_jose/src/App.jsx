import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './views/home';
import Nav from './components/Nav';
import './assets/styles/index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      
    </>
  )
}

export default App
