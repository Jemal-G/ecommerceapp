import React from "react";
import People from "./people";

function PeopleList() {
  const peopleData = [
    { name: "Juan", favoriteNumber: 9, colors: ["green", "blue", "purple"] },
    { name: "Ivy", favoriteNumber: 42, colors: [] },
    { name: "Kia", favoriteNumber: 43, colors: [] },
  ];

  return (
    <div>
      {peopleData.map((person, index) => (
        <People 
          key={index}
          name={person.name}
          favoriteNumber={person.favoriteNumber}
          colors={person.colors}
        />
      ))}
    </div>
  );
}

export default PeopleList;
