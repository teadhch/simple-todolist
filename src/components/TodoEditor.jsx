import "./TodoEditor.css";
import { useState } from "react";

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    onCreate(content);
  };
  return (
    <div className="TodoEditor">
      <h4>새로운 할일 작성하기</h4>
      <div className="editor_wrapper">
        <input
          placeholder="새로운 Todo..."
          value={content}
          onChange={onChangeContent}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
