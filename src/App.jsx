import { useRef, useReducer, useCallback } from "react";
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

function todoReducer(state, action) {
  // 상태 변화 로직
  switch (action.type) {
    case "CREATE":
      return [action.newItem, ...state]; // 기존의 배열에 action.newItem(새로운 할일) 추가
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it,
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
  }
}

function App() {
  const [todo, dispatch] = useReducer(todoReducer, mockTodo);
  const idRef = useRef(4);

  // useCallback을 이용해 앱에서 App컴포넌트가 리렌더링 될 때, 함수 onUpdate, onDelete를 재생성하지 않도록 만들어서 TodoItem 컴포넌트의 렌더링 최적화를 해보자
  // const memoizedFunc = useCallback(콜백함수, 의존성배열)

  // 새로운 할일 추가
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        isDone: false,
        content: content,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  // 할일 수정하기
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  // 할일 삭제하기
  // const onDelete = (targetId) => {
  //   setTodo(todo.filter((it) => it.id !== targetId));
  // };

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);
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
