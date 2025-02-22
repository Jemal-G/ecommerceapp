import React from 'react'
import Calculator from './calculator';
import './App.css'

function App() {

  return (
    <div className='container'>
      <h2>
        Arithmetic calculation
      </h2>
      <Calculator num1={10} num2={5} />

    </div>
  )
}

export default App
