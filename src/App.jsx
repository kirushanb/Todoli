import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import { useStateValue } from "./StateProvider/StateProvider";
import Header from "./Components/Header/Header";
import { getTodo } from "./Services/TodoServices";
import TodoManager from "./Components/TodoManager/TodoManager";
import Footer from "./Components/Footer/Footer";

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    let todoList = getTodo();

    if (todoList && todoList.length !== 0) {
      dispatch({ type: "SET_BASKET", list: todoList });
    } else {
      dispatch({
        type: "EMPTY_BASKET",
      });
    }
  }, [dispatch]);
  
  return (
    <>
      <div className="container">
        <div className="row" style={{position: "sticky",zIndex: 1,top:0, backgroundColor:"white" }}>
          <div className="col">
            <Header />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div style={{ minHeight: "75vh" }}>
              <Switch>
                <Route path="/" exact component={TodoManager} />
                <Route path="/**" component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
