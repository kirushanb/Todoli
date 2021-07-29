import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StateProvider } from "../../../../StateProvider/StateProvider";
import Reducer from "../../../../Reducer/Reducer";
import TodoList from "../../TodoList/TodoList";
import TodoItem from "./TodoItem";
import { mount, shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

describe("Timer", () => {
  const Setup = () => {
    const InitialState = {
      basket: [
        { title: "Meeting with Anurag", status: "pending", duration: null },
      ],
      started: false,
    };
    render(
      <StateProvider initialState={InitialState} reducer={Reducer}>
        <TodoList />
      </StateProvider>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test("Start timer and stop timer", async () => {
    Setup();

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /Start/i }));
    });

    expect(screen.getByRole("listitem")).toHaveTextContent("00 : 00 : 00");

    jest.advanceTimersByTime(1000);

    expect(screen.getByRole("listitem")).toHaveTextContent("00 : 00 : 01");

    jest.advanceTimersByTime(1000);

    expect(screen.getByRole("listitem")).toHaveTextContent("00 : 00 : 02");
    screen.debug();
  });


  
  
});
