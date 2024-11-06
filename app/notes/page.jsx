"use client";

import { useEffect } from "react";
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

  return (
    <div className={styles.container}>
      <h1>Список заметок</h1>

      <div className={styles["filter-buttons"]}>
        <button
          className={styles.button}
          onClick={() => dispatch(filterByWeek())}
        >
          За неделю
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(filterByMonth())}
        >
          За месяц
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(clearFilter())}
        >
          Сбросить фильтр
        </button>
      </div>

      <ul className={styles["note-list"]}>
        {notes.map((note) => (
          <li className={styles["note-item"]} key={note.id}>
            <div className={styles["note-content"]}>
              <h3 onClick={() => handleNoteClick(note.id)}>{note.title}</h3>
              <p>{note.content}</p>
              <small>
                Дата создания: {new Date(note.created_at).toLocaleDateString()}
              </small>
            </div>

            <button
              className={styles["delete-button"]}
              onClick={() => handleDeleteNote(note.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>

      <button className={styles.button} onClick={handleAddNote}>
        Добавить заметку
      </button>
    </div>
  );
};

export default Home;
