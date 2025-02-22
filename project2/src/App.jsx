import React from "react";
import Calculator from "./calculator";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Arithmetic Calculator</h1>

      {/* Pass two numbers */}
      <Calculator num1={10} num2={5} />

      {/* Pass multiple numbers */}
      <Calculator numbers={[20, 5, 2]} />
    </div>
  );
}

export default App;
