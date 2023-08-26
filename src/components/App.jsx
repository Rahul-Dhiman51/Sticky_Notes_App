import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import { v4 as uuidv4 } from "uuid";
import { saveNotesToLocalStorage, loadNotesFromLocalStorage } from "./localStorageUtils";

function App() {
  // Load notes from local storage on initial render
  const [notes, setNotes] = useState(loadNotesFromLocalStorage());

  function addNotes(note) {
    const newNote = {
      id: uuidv4(),
      title: note.title,
      content: note.content,
    };

    setNotes((prevValue) => {
      const updatedNotes = [...prevValue, newNote];
      saveNotesToLocalStorage(updatedNotes); // Save the updated notes to local storage
      return updatedNotes;
    });
  }

  function deleteNote(id) {
    setNotes((prevValue) => {
      const updatedNotes = prevValue.filter((note) => note.id !== id);
      saveNotesToLocalStorage(updatedNotes); // Save the updated notes to local storage
      return updatedNotes;
    });
  }

  function editNote(id, editedTitle, editedContent) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: editedTitle, content: editedContent } : note
      )
    );
  }

  // Save notes to local storage whenever the notes state changes
  useEffect(() => {
    saveNotesToLocalStorage(notes);
  }, [notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNotes} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          onDel={deleteNote}
          onEdit={editNote}
          title={note.title}
          content={note.content}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
