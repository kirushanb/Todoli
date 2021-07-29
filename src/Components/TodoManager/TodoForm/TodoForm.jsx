import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
// import { addToDo } from "../../../Services/TodoServices";
// import { useStateValue } from "../../../StateProvider/StateProvider";

const TodoForm = React.memo( ({handleSubmit, handleChange, title, titleErr}) => {
  console.log("form rendered")
  

  

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Todo</Label>
        <Input
          value={title}
          onChange={handleChange}
          placeholder='todoForm'
        />
        <span style={{ color: "red", fontSize: "12px" }}>{titleErr}</span>
      </FormGroup>

      <Button style={{marginTop:20}} color="secondary">Add</Button>
    </Form>
  );
})

export default TodoForm;
