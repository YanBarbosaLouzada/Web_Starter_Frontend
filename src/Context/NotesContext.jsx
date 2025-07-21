import React, { createContext, useState } from 'react';
import { mockNotes } from '../Mock/mockNotes';
import { generateAtualDate } from '../Helpers/generateAtualDate';
import { generateRandomId } from '../Helpers/generateRandomId';

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([...mockNotes]);
  //criando variaveis para função editar
  const [note, setNote] = useState({ title: "", description: "" });
  const [isEditing, setEditing] = useState(false);
  const [idEdit, setIdEdit] = useState("")

  const addNote = (title, description) => {
    setNotes([
      ...notes,
      { id: generateRandomId(), description, title, date: generateAtualDate() },
    ]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // criando função edit
  const editnote = (id) => {
    setNotes(
      notes.map((n) => {
        if (n.id === id) {
          return { ...note, id: id, data: generateAtualDate() }
        } else {
          return n;
        }
      })
    )
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, note, setNote, isEditing, setEditing, idEdit, setIdEdit, editnote }}>{children}</NoteContext.Provider>
  )
};

export { NoteProvider, NoteContext };