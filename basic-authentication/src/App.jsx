import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// main.jsx or App.jsx



import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

function App() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState('public')

  return (
    <>
      <Nav current={current} onSelect={setCurrent} />

      <div className="logo-row">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="*" element={<Public />} />
      </Routes>
    </>
  )
}

export default App
