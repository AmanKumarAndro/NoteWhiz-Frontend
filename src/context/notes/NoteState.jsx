import NoteContext from "./noteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
  const host = "https://note-whiz-backend.vercel.app";
  const notesHard = [];

  const [notes, setNotes] = useState(notesHard);
  const [alert, setAlert] = useState({
    title: "",
    message: ""
  });

  // Get Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    setAlert({ title: "NoteWhiz", message: "Note added successfully" });
    clearAlertAfterTimeout();
  };

  // Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(notes.filter((note) => { return note._id !== id }));
    setAlert({ title: "NoteWhiz", message: "Note deleted successfully" });
    clearAlertAfterTimeout();
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
    setAlert({ title: "NoteWhiz", message: "Note updated successfully" });
    clearAlertAfterTimeout();
  };

  // Clear Alert After Timeout
  const clearAlertAfterTimeout = () => {
    setTimeout(() => {
      setAlert({ title: "", message: "" });
    }, 3000);
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes, alert }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
