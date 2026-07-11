"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>("");

  const addTodo = (text: string) => {
    const newText = text.trim();

    if (newText === "") return;

    if (todos.find((todo) => todo.text === newText)) return;

    setTodos((prev) => [...prev, { id: Date.now(), text: newText }]);

    setText("");
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-10">
      <h1>Simple Todo App</h1>
      <input
        type="text"
        placeholder="Enter Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo(text);
        }}
      />
      <div className="space-y-8">
        <h2>My Todos:</h2>
        <div className="space-y-4">
          {todos.map((todo) => (
            <div key={`${todo.id}-${todo.text}`}>
              <p>{todo.id}</p>
              <li>{todo.text}</li>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
