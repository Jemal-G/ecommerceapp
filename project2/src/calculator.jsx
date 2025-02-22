import React from "react";

function Calculator({ num1, num2, numbers }) {
  if (numbers && numbers.length > 0) {
    // Perform calculations on multiple numbers
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const difference = numbers.reduce((acc, num) => acc - num);
    const product = numbers.reduce((acc, num) => acc * num, 1);
    const modulus = numbers.reduce((acc, num) => acc % num);
    const division =
      numbers.slice(1).includes(0) 
        ? "Cannot divide by zero"
        : numbers.reduce((acc, num) => acc / num);

    return (
      <div className="calculator">
        <h2>Numbers: {numbers.join(", ")}</h2>
        <p>Sum: {sum}</p>
        <p>Difference: {difference}</p>
        <p>Product: {product}</p>
        <p>Modulus: {modulus}</p>
        <p>Division: {division}</p>
      </div>
    );
  }

  // If num1 and num2 are provided, perform calculations on them
  return (
    <div className="calculation">
      <h3>The first number is: {num1}</h3>
      <h3>The second number is: {num2}</h3>
      <p>Addition of two Numbers: {num1 + num2}</p>
      <p>Subtraction of two Numbers: {num2 - num1}</p>
      <p>Multiplication: {num1 * num2}</p>
      <p>Modulus: {num1 % num2}</p>
      <p>Division: {num2 !== 0 ? (num1 / num2).toFixed(1) : "Cannot divide by zero"}</p>
    </div>
  );
}

export default Calculator;
