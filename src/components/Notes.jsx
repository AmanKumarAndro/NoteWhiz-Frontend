import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NotesContainer from './NotesContainer';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate(); 
  const { notes, getNotes, alert } = useContext(NoteContext);

  // get all notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    else {
      navigate("/signin");
    }
  }, []);


  // reload when any note is added
  useEffect(() => {
    getNotes();
  }, [notes.length]);

  // if no notes then message
  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <p className="text-center text-6xl font-bold text-primaryColor">
        No Notes Found
      </p>
    );
  }

  return (
    <>
      <Alert title={alert.title} message={alert.message} />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NotesContainer
            key={note._id}
            props={note}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
