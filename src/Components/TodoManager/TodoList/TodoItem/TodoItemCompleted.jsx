import React from "react";
import { ListGroupItem } from "reactstrap";
// import { deleteTodo } from "../../../../Services/TodoServices";
// import { useStateValue } from "../../../../StateProvider/StateProvider";
import "./TodoItem.css";

const TodoItemCompleted = React.memo(({ todo, handleDelete }) =>  {
  console.log("Completed component rendered")
 
  const { title, duration } = todo;
  // const [, dispatch] = useStateValue();

  

  return (
    <ListGroupItem >
      <div className="main_div">
        <div className="main_flex">
          <div className="content_with_button" htmlFor='completed_todo' aria-labelledby='completed_todo'>
            <div className="title_with_duration">
              <label htmlFor='completed_todo' aria-labelledby='completed_todo'>{title}</label>
              {duration != null ? (
                <p style={{ color: "#636363", fontSize: 12 }}>
                  {duration + " Time elapsed"}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ marginLeft: 20 }}
            onClick={()=>handleDelete(todo)}
          />
        </div>
      </div>
    </ListGroupItem>
  )
}) 

export default TodoItemCompleted;
