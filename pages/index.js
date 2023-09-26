import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  // only runs in first render
  useEffect(() => {
    console.log("loading seed/saved data");
    setTodos(seedData());
  }, []);

  console.log("rendering Home");

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = function (e) {
    e.preventDefault();
    const newTodos = [...todos, { title, done: false }];
    setTodos(newTodos);
    setTitle("");
    save(newTodos);
  };

  const handleCheckChange = function (e, index) {
    const newTodos = [...todos];
    newTodos[index].done = e.target.checked;
    setTodos(newTodos);
    save(newTodos);
  };

  const handleDelete = function (e, index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    save(newTodos);

  };

  const save = function (data) {
    const json = JSON.stringify(data);
    localStorage["data"] = json;
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

function seedData() {
  if (localStorage["data"]) {
    return JSON.parse(localStorage["data"]);
  }
  else {
    return [
      { title: "Do your homework", done: false },
      { title: "Wash the dishes", done: false },
      { title: "Watch Netflix", done: true },
      { title: "Walk in the park", done: true }
    ];
  }
}