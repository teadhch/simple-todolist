import "./TodoEditor.css";
import { useState, useRef } from "react";

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const inputRef = useRef(null);
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      alert("할일을 입력하세요!");
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      onSubmit();
    }
  };
  return (
    <div className="TodoEditor">
      <h4>새로운 할일 작성하기</h4>
      <div className="editor_wrapper">
        <input
          ref={inputRef}
          placeholder="새로운 Todo..."
          value={content}
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
