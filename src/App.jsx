import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

// 목업 데이터 + 데이터 디자인
const mockTodo = [
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "청소하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 3,
    isDone: false,
    content: "게으름피기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todo, setTodo] = useState(mockTodo);
  return (
    <>
      <div className="App">
        <Header />
        <TodoEditor />
        <TodoList todo={todo} />
      </div>
    </>
  );
}

export default App;
