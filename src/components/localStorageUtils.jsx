// localStorageUtils.js
export function saveNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
  export function loadNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  }
  