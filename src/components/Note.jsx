import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListDisplay from "./ListDisplay";

function Note({ id, title: initialTitle, content: initialContent, onEdit, onDel }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(id, title, content);
    setIsEditing(false);
  };

  return (
    <div className={`note ${isEditing ? "edit-mode" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-content"
            rows={4}
          />
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <ListDisplay inputString={content} />
          <button onClick={handleEditClick}>
            <EditIcon />
          </button>
          <button onClick={() => onDel(id)}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;
