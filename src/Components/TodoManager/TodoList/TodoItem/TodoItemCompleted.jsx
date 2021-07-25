import React from "react";
import { ListGroupItem } from "reactstrap";
import { deleteTodo } from "../../../../Services/TodoServices";
import { useStateValue } from "../../../../StateProvider/StateProvider";
import "./TodoItem.css";

const TodoItemCompleted = (props) => {
  const { todo } = props;
  const { title, duration } = todo;
  const [, dispatch] = useStateValue();

  const handleDelete = () => {
    deleteTodo(todo)
      .then((todo) => {
        dispatch({ type: "REMOVE_FROM_BASKET", title: todo.title });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ListGroupItem>
      <div className="main_div">
        <div className="main_flex">
          <div className="content_with_button">
            <div className="title_with_duration">
              <label>{title}</label>
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
            onClick={handleDelete}
          />
        </div>
      </div>
    </ListGroupItem>
  );
};

export default TodoItemCompleted;
