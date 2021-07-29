import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoManager from "../TodoManager";
import { StateProvider } from "../../../StateProvider/StateProvider";
import Reducer, { InitialState } from "../../../Reducer/Reducer";

describe("TodoForm", () => {

  const Setup = () => {
    render(
      <StateProvider initialState={InitialState} reducer={Reducer}>
        <TodoManager />
      </StateProvider>
    );
  };


  test("Try to input a blank string and capture the error message", async () => {
    Setup();

    userEvent.type(screen.getByRole("textbox"), "");
    const submitButton = screen.getByRole("button", { name: /Add/i });
    await act(async () => {
      userEvent.click(submitButton);
    });
    expect(screen.getByText("Todo cannot be blank!")).toBeInTheDocument();
  });



  test("Add todo and render it on pending list", async () => {
    Setup();
    
    userEvent.type(screen.getByRole("textbox"), "Meeting with Kirushan");
    const submitButton = screen.getByRole("button", { name: /Add/i });
    await act(async () => {
      userEvent.click(submitButton);
    });
    expect(screen.getByRole("listitem")).toHaveTextContent(
      "Meeting with Kirushan"
    );
  });



  test("Try to input todo which already exists in the storage and capture the error message", async () => {
    Setup();
    userEvent.type(screen.getByRole("textbox"), "Meeting with Kirushan");
    const submitButton = screen.getByRole("button", { name: /Add/i });
    await act(async () => {
      userEvent.click(submitButton);
    });
    expect(
      screen.getByText("The meeting is already exists!")
    ).toBeInTheDocument();
  });

  
});
