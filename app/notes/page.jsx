"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotes,
  filterByWeek,
  filterByMonth,
  clearFilter,
  addNote,
  deleteNote,
} from "@/store/notesSlice";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import styles from "./NotesPage.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.filteredNotes);
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:3001/notes");
      const data = await response.json();
      dispatch(setNotes(data));
    };
    fetchNotes();
  }, [dispatch]);

  const handleAddNote = async () => {
    const newNote = {
      id: uuidv4(),
      title: "Новая заметка",
      content: "Содержание новой заметки",
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        dispatch(addNote(newNote));
        router.push(`/notes/${newNote.id}`);
      } else {
        console.error("Ошибка при добавлении заметки");
      }
    } catch (error) {
      console.error("Ошибка при добавлении заметки:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(deleteNote(id));
      } else {
        console.error("Ошибка при удалении заметки");
      }
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    }
  };

  const handleNoteClick = (id) => {
    router.push(`/notes/${id}`);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    switch (filterType) {
      case "week":
        dispatch(filterByWeek());
        break;
      case "month":
        dispatch(filterByMonth());
        break;
      default:
        dispatch(clearFilter());
        break;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-light ">Список заметок</h1>

      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn ${
            activeFilter === "week" ? styles.active : "btn-primary"
          }`}
          onClick={() => handleFilterClick("week")}
        >
          За неделю
        </button>
        <button
          className={`btn ${
            activeFilter === "month" ? styles.active : "btn-primary"
          }`}
          onClick={() => handleFilterClick("month")}
        >
          За месяц
        </button>
        <button
          className={`btn ${
            activeFilter === "all" ? styles.active : "btn-secondary"
          }`}
          onClick={() => handleFilterClick("all")}
        >
          Сбросить фильтр
        </button>
      </div>

      <ul
        className="list-group overflow-auto"
        style={{ maxHeight: "400px", gap: "10px" }}
      >
        {notes.map((note) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start rounded-3 border bg-dark text-light"
            key={note.id}
            style={{ marginBottom: "10px" }}
          >
            <div className="flex-grow-1">
              <h5 className="mb-1" onClick={() => handleNoteClick(note.id)}>
                {note.title}
              </h5>
              <p className="mb-1">{note.content}</p>
              <small className="text-light">
                Дата создания: {new Date(note.created_at).toLocaleDateString()}
              </small>
            </div>
            <button
              className="btn btn-danger btn-sm ml-2"
              onClick={() => handleDeleteNote(note.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <button className="btn btn-success mt-3" onClick={handleAddNote}>
        Добавить заметку
      </button>
    </div>
  );
};

export default Home;
