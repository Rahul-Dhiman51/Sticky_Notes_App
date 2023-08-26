import React, { useState } from "react";

function ListDisplay({ inputString }) {
  const [isTrue, setIsTrue] = useState(new Array(inputString.split("\n").length).fill(false));

  function HandleOnClick(idx) {
    // console.log(isTrue);
    setIsTrue((prevValue) => {
        const newState = [...prevValue];
        newState[idx] = !newState[idx];
        return newState;
    });
  }

  // Split the input string into an array of lines
  const lines = inputString.split("\n").filter((line) => line.trim() !== "");

  return (
    <ul>
      {lines.map((line, idx) => (
        <li
          onClick={()=>HandleOnClick(idx)}
          style={{ textDecoration: isTrue[idx] ? "line-through" : "none", listStyle: "circle"} }
          key={idx}
        >{line}
          
        </li>
      ))}
    </ul>
  );
}

export default ListDisplay;
