import React from "react";
import "./people.css";

function People({ name, favoriteNumber, colors }) {
  return (
    <div className="person">
      <h2>Hello {name} ! ! !</h2>
      <p>{name}'s favorite number is {favoriteNumber}</p>
      <p>{name}'s favorite number plus 10 is {favoriteNumber + 10}</p>
      <p>{name}'s favorite colors are:</p>
      <ul>
        {colors.length > 0 ? (
          colors.map((color, index) => <li key={index}>{color}</li>)
        ) : (
          <li>None</li>
        )}
      </ul>
    </div>
  );
}

export default People;
