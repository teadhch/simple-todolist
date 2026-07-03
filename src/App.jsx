import { useState, useRef } from "react";
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
    isDone: true,
    content: "게으름피기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todo, setTodo] = useState(mockTodo);
  const idRef = useRef(4);

  // 새로운 할일 추가
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    }; // 새로운 할일 객체 생성
    setTodo([newItem, ...todo]); // 기존의 todo 앞에 새로운 할일 객체 추가 후 새 배열반환
    idRef.current += 1; // 할일 객체의 id값 1 증가 (id값이 중복 되지 않도록)
  };

  // 할일 수정하기
  const onUpdate = (targetId) => {
    setTodo(
      todo.map((it) => {
        if (it.id === targetId) {
          // 수정할 할일을 찾음
          return { ...it, isDone: !it.isDone }; //수정해서 반환해주면 map이 새로운 배열을 setTodo로 바꾸고
        } else {
          return it;
        }
      }),
    );
  };

  // 할일 삭제하기
  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (
    <>
      <div className="App">
        <Header />
        <TodoEditor onCreate={onCreate} /> {/* 함수도 props로 내려줄 수 있다 */}
        <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
