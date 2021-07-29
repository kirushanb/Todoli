import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { addToDo } from "../../Services/TodoServices";
import { useStateValue } from "../../StateProvider/StateProvider";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";

const TodoManager = () => {
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [, dispatch] = useStateValue();

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!title) {
        setTitleErr("Todo cannot be blank!");
      } else {
        const todo = { title, status: "pending", duration: null };
        addToDo(todo)
          .then((todo) => {
            dispatch({ type: "ADD_TO_BASKET", item: todo });
            setTitle("");
            setTitleErr("");
          })
          .catch((err) => {
            setTitleErr(err.msg);
            console.log(err.msg);
          });
      }
    },
    [title, dispatch]
  );

  const handleChange = React.useCallback((e) => setTitle(e.target.value), []);

  return (
    <Row>
      <Col>
        <TodoForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          title={title}
          titleErr={titleErr}
        ></TodoForm>
      </Col>
      <Col>
        <TodoList></TodoList>
      </Col>
    </Row>
  );
};

export default TodoManager;
