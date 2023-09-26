import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([
    { title: "Do your homework", done: false },
    { title: "Wash the dishes", done: false },
    { title: "Watch Netflix", done: true },
    { title: "Walk in the park", done: true }
  ]);

  const handleSubmit = function (e) {
    e.preventDefault();
    setTodos([...todos, { title, done: false }]);
    setTitle("");
  };

  const handleCheckChange = function (e, index) {
    const newTodos = [...todos];
    newTodos[index].done = e.target.checked;
    setTodos(newTodos);
  };

  const handleDelete = function (e, index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <Head>
        <title>To-Do List</title>
        <meta name="description" content="A sample to-do list project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>To-Do List</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="What are you going to do?" required />{" "}
            <button>Add</button>
          </div>
        </form>

        <div className={styles.todos}>
          {todos.map((todo, i) =>
            <div key={i} className={styles.todoItem + " " + (todo.done ? styles.done : styles.undone)}>
              <input type="checkbox" checked={todo.done}
                onChange={(e) => handleCheckChange(e, i)} />
              <span>{todo.title}</span>
              <button onClick={(e) => handleDelete(e, i)}>&times;</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
