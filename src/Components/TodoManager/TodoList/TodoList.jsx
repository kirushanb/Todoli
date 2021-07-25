import React from "react";
import { ListGroup, Alert } from "reactstrap";
import { useStateValue } from "../../../StateProvider/StateProvider";
import TodoItem from "./TodoItem/TodoItem";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import TodoItemCompleted from "./TodoItem/TodoItemCompleted";


const TodoList = () => {
  const [{ basket }] = useStateValue();
  const completed = basket.filter((n) => n.status === "completed");
  const pending = basket.filter((n) => n.status === "pending");

  if (basket.length === 0) {
    return <Alert>No Todos to show.</Alert>;
  }
  return (
    <>
      <label style={{ margin: 10 }}>Pending</label>
      <HighlightOffIcon style={{ color: "#d13030" }}></HighlightOffIcon>
      <ListGroup>
        {pending && pending.length === 0 ? (
          <p>No pending Todos to show</p>
        ) : (
          pending.map((todo, index) => <TodoItem key={index} todo={todo} />)
        )}
      </ListGroup>
      <hr></hr>
      <label style={{ margin: 10 }}>Completed</label>
      <CheckCircleIcon style={{ color: "green" }}></CheckCircleIcon>
      <ListGroup>
        {completed && completed.length === 0 ? (
          <p>No completed Todos to show</p>
        ) : (
          completed.map((todo, index) => (
            <TodoItemCompleted key={index} todo={todo} />
          ))
        )}
      </ListGroup>
    </>
  );
};

export default TodoList;
