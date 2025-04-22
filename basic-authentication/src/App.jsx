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
import Project05 from './Project05'

function App() {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState('public')

  return (
    <>
      <Nav current={current} onSelect={setCurrent} />

      <main style={{ padding: '1rem' }}>
      <h1 style={{ color: '#cc0000' }}>MY React journey:</h1>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li style={{ marginBottom: '1rem' }}>
      <a
        href="https://www.youtube.com/watch?v=SqcY0GlETPk"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          backgroundColor: 'purple',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}
      >
        ▶ Learn React(YouTube)
      </a>
    </li>
    <li style={{ marginBottom: '0.5rem' }}>
      <a
        href="https://react.dev/learn"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'blue' }}
      >
       React Docs: Learn React
      </a>
    </li>
  </ul>
      </main>

      <Routes>
        <Route path="/" element={<Public />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/project05" element={<Project05 />} />
        <Route path="*" element={<Public />} />
      </Routes>
    </>
  )
}

export default App
