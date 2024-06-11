import React, { useEffect, useState } from "react";
import Linkify from 'react-linkify';
import { loadNotesFromLocalStorage, saveNotesToLocalStorage } from "./localStorageUtils";

function ListDisplay({ id, inputString, isToggled }) {
  isToggled = isToggled || new Array(inputString.split("\n").length).fill(false);
  const [isTrue, setIsTrue] = useState(isToggled);

  function updateIsToggledInLocalStorage(id, updatedIsToggled) {
    const notes = loadNotesFromLocalStorage();
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, isToggled: updatedIsToggled };
      }
      return note;
    });
    saveNotesToLocalStorage(updatedNotes);
  }

  useEffect(() => {
    updateIsToggledInLocalStorage(id, isTrue);
  }, [isTrue])


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

  const linkDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <ul>
      {lines.map((line, idx) => (
        <li
          onClick={() => HandleOnClick(idx)}
          style={{ textDecoration: isTrue[idx] ? "line-through" : "none", listStyle: "circle" }}
          key={idx}
        ><Linkify componentDecorator={linkDecorator}>{line} </Linkify>
        </li>
      ))}
    </ul>
  );
}

export default ListDisplay;
