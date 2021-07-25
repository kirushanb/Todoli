import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { addToDo } from "../../../Services/TodoServices";
import { useStateValue } from "../../../StateProvider/StateProvider";

const TodoForm = () => {
  const [title, setTitle] = useState("")
  const [titleErr, setTitleErr] = useState("")
  const [, dispatch] = useStateValue()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) {
      setTitleErr("Todo cannot be blank!");
    } else {
      const todo ={title, status:"pending", duration:null}
      addToDo(todo)
        .then((todo) => {
          dispatch({ type: "ADD_TO_BASKET", item: todo });
          setTitle("");
          setTitleErr("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Todo</Label>
        <Input
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
        />
        <span style={{ color: "red", fontSize: "12px" }}>{titleErr}</span>
      </FormGroup>

      <Button style={{marginTop:20}} color="secondary">Add</Button>
    </Form>
  );
};

export default TodoForm;
