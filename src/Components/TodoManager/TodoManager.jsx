import React from "react";
import { Row, Col } from "reactstrap";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";

const TodoManager = () => {
  return (
    <Row >
      <Col>
        <TodoForm></TodoForm>
      </Col>
      <Col>
        <TodoList></TodoList>
      </Col>
    </Row>
  );
};

export default TodoManager;
