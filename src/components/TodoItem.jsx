import "./TodoItem.css";
import React from "react";

const TodoItem = ({ id, content, isDone, createdDate, onUpdate, onDelete }) => {
  console.log(`${id} TodoItem 이 렌덩링됨....`);
  const onChangeCheckBox = () => {
    onUpdate(id);
  };
  const onClickDelete = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={isDone} onChange={onChangeCheckBox} />
      </div>
      <div className="title_col">{content}</div>
      <div className="date_col">{new Date(createdDate).toLocaleString()}</div>
      <div className="btn_col">
        <button onClick={onClickDelete}>삭제</button>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
