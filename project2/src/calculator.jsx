import React from "react";

function calculator ({num1, num2}) {

    return (
        <div className="calculation">
            <h3>The first number is : &nbsp;{num1}</h3>
            <h3>The second numberis :&nbsp; {num2}</h3>
            <p>Addition of two Number:&nbsp; &nbsp;{num1 + num2}</p>
            <p>Substraction of two Number: &nbsp;&nbsp;&nbsp;{num2 - num1}</p>
            <p>Multiplaction of Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{num1 * num2}</p>
            <p>Modulus or remainder of Number : &nbsp;&nbsp;{num1 % num2}</p>
            <p>Division of Number not divided to O : {num2 !== 0 ?(num1/num2).toFixed(1) : "Cannot divide by zero"}</p>
        </div>
    );
}

export default calculator;