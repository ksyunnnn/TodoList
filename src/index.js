import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);

  const [addValue, setAddValue] = useState("");
  const handleAddValue = e => setAddValue(e.target.value);

  const addTodo = e => {
    e.preventDefault();
    setTodos(pre => [...pre, addValue]);
    setAddValue("");
  };

  const removeTodo = targetTodo => {
    const newTodos = todos.filter(todo => todo !== targetTodo);
    setTodos(newTodos);
  };

  // 初期ローディング
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://jsonbox.io/box_ksyunnnne8bb071cbaf7c0fa1829/5d8993272bd38a0017ce2d53"
      )
      .then(response => {
        setTodos(response.data.todos);
        setInit(true);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // todosの変更を監視してサーバーupdate
  useEffect(() => {
    if (!init) return;
    updateTodos();
  }, [todos]);

  const updateTodos = () => {
    console.log(todos);
    axios
      .put(
        "https://jsonbox.io/box_ksyunnnne8bb071cbaf7c0fa1829/5d8993272bd38a0017ce2d53",
        {
          todos
        }
      )
      .then(response => {
        console.log("success", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h2>Todo List</h2>

      <div className="todo-list">
        {loading ? "loading..." : ""}
        {todos.map((todo, i) => (
          <li key={i} className="todo">
            {todo}
            <span onClick={() => removeTodo(todo)}>削除</span>
          </li>
        ))}
      </div>

      <div className="todo-tool">
        <form onSubmit={addTodo}>
          <input value={addValue} onChange={handleAddValue} required />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
