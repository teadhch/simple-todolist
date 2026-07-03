import { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchRsult = () => {
    // 검색어(search)가 없으면 todo(할일 전체목록)를 반환하고,
    // 검색어가 있으면 할일목록(배열)을 순회하여, 검색어가 할일 내용중에 포함된 할일들만 추려서
    // 새로운 배열에 넣고 그 주소를 반환한다.
    // 할일의 내용과 검색어를 모두 소문자변환하여 영어 대소문자를 구분하지 않고 검색 되도록...
    return search === ""
      ? todo
      : todo.filter((it) =>
          it.content.toLowerCase().includes(search.toLowerCase()),
        );
  };

  return (
    <div className="TodoList">
      <h4>Todo List</h4>
      <input
        className="searchbar"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="list_wrapper">
        {/* getSearchResult() 함수가 호출된 결과 또한 배열이므로, map을 사용할 수 있고, filter()를 사용했기 때문에 호출 될 때마다 매번 새로운 배열의 주소값으로 교체되어 아래의 부분이 재 렌더링 된다. 또한 filter()가 얕은 복사를 수행하기 때문에 기존의 할일목록 (todo)는 수정되지 않는다 */}
        {getSearchRsult().map((it) => (
          <TodoItem
            key={it.id}
            {...it}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
