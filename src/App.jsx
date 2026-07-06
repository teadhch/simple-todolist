import { useState, useRef, useReducer } from "react";
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

function reducer(state, action) {
  // 상태변화 코드들이 모여있게 되는 함수 (상태변화함수)
  // state : state변수
  // action : dispatch() 함수의 매개변수 = Action 객체
  switch (action.type) {
    case "Increase":
      return state + action.data;
    case "Decrease":
      return state - action.data;
  }
}

function TestComp() {
  // const [count, setCount] = useState(0);

  // const [state변수, 상태변화촉발함수(dispatch)] = useReducer(상태변화함수, 초기값);
  // useReducer가 반환하는 함수 dispatch를 호출하면, useReducer는 reducer함수를 호출하게 된다.
  const [count, dispatch] = useReducer(reducer, 0);

  // const onIncrease = () => {
  //   // 상태 변경 코드
  //   setCount(count + 1);
  // };

  // const onDecrease = () => {
  //   // 상태 변경 코드
  //   setCount(count - 1);
  // };

  return (
    <div>
      <h4>테스트</h4>
      <div>{count}</div>
      <div>
        {/* 버튼을 클릭하면 dispatch()함수가 호출되도록 했다
          dispatch()는 매개변수로 ACTION객체(state값을 어떻게 변경한다 라는 변경정보)라는 것을 넘겨줘야 한다.
          아래에서는 +버튼을 클릭하면 1을 증가시킨다 라는 내용이 Action객체의 내용이 되고, -버튼을 클릭하면 10을 감소시킨다 라는 내용이 Action객체의 내용이 된다.
        */}
        <button onClick={() => dispatch({ type: "Increase", data: 1 })}>
          +
        </button>
        <button onClick={() => dispatch({ type: "Decrease", data: 10 })}>
          -
        </button>
      </div>
    </div>
  );
}

function App() {
  const [todo, dispatch] = useReducer(todoReducer, mockTodo);
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
        <TestComp />
        <TodoEditor onCreate={onCreate} /> {/* 함수도 props로 내려줄 수 있다 */}
        <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </>
  );
}

export default App;
