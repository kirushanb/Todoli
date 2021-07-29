import React, { useState, useRef } from "react";
import { ListGroupItem, Button } from "reactstrap";
import {  editTodo } from "../../../../Services/TodoServices";
import { useStateValue } from "../../../../StateProvider/StateProvider";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./TodoItem.css";






const TodoItem = ({todo, handleDelete}) => {
  console.log("Pending component rendered")
 
  const { title, status } = todo;
  const [{ started }, dispatch] = useStateValue();
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState("");
  const timer = useRef(null);


  




  const handleStart = () => {
    dispatch({ type: "SET_STARTED", bool: true });
    setStart(true);
    timer.current = setInterval(() => {
      setSeconds((currentTime) => currentTime + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    timer.current = null;
    setStart(false);
    setSeconds(0);
    setTime(formatTime())
    console.log(time)
    editTodo({ title, status: "completed", duration: formatTime() })
      .then((todo) => {
        dispatch({ type: "EDIT_TODO", todo: todo });
        dispatch({ type: "SET_STARTED", bool: false });
      })
      .catch((err) => console.log(err));
  };


  const handleDone = () =>{
    editTodo({ title, status: "completed", duration: null })
    .then((todo) => {
      dispatch({ type: "EDIT_TODO", todo: todo });
    })
    .catch((err) => console.log(err));
  }

   

  const formatTime = () => {
    console.log("Format time called")
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  }

  return (
    <ListGroupItem >
      <div className="main_div">
        <div className="main_flex">
          <div className="content_with_button">
            <div id='title_pending_todo' className="title_with_duration" aria-labelledby='title_pending_todo'>
              <label htmlFor='title_pending_todo' aria-labelledby='title_pending_todo'>{title}</label>
            </div>
          </div>
          <div className="content_with_button">
            {status === "pending" ? (
              !start ? (
                <>
                <Button outline color="info" size="sm" onClick={handleDone}>Mark As Done</Button>
                  <Button
                    style={{ marginRight: 128, marginLeft: 10 }}
                    outline
                    color="success"
                    onClick={handleStart}
                    size="sm"
                    disabled={started}
                  >
                    Start
                  </Button>
                  
                </>
              ) : (
                <>
                  <Button
                    style={{ marginLeft: 20 }}
                    outline
                    color="danger"
                    onClick={handleStop}
                    size="sm"
                  >
                    Stop
                  </Button>
                  <h1 style={{ marginLeft: 20 }}>{formatTime()}</h1>
                  <FiberManualRecordIcon
                    style={{ color: "green", marginLeft: 20 }}
                  />
                  <p style={{ color: "#636363", fontSize: 12 }}> Active</p>
                </>
              )
            ) : (
              ""
            )}
            {!start && (
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{ marginLeft: 20 }}
                onClick={()=>handleDelete(todo)}
              />
            )}
          </div>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default TodoItem;
