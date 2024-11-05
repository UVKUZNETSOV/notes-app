"use client";

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation'

import styles from "./NotePage.module.css"

const NoteDetail = () => {
  const params = useParams()
  const id = params.id

  const [note, setNote] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        try {
          const response = await fetch(`http://localhost:3001/notes/${id}`);
          const data = await response.json();
          setNote(data);
        } catch (error) {
          console.error("Ошибка при загрузке заметки:", error);
        }
      }
    };
    fetchNote();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const saveNote = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        alert("Заметка успешно сохранена!");
        setIsEditing(false); 
      } else {
        console.error("Ошибка при сохранении заметки");
      }
    } catch (error) {
      console.error("Ошибка при сохранении заметки:", error);
    }
  };

  return (
    <div className={styles.container}>
      {isEditing ? (
        <div className={styles.editing}>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleInputChange}
            placeholder="Название"
          />
          <textarea
            name="content"
            value={note.content}
            onChange={handleInputChange}
            placeholder="Содержание"
          />
          <button onClick={saveNote}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отменить</button>
        </div>
      ) : (
        <div className={styles["not-editing"]}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </div>
      )}
    </div>
  );
};

export default NoteDetail;