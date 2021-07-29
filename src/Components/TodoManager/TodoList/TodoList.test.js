import React from "react";
import {
  act,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StateProvider } from "../../../StateProvider/StateProvider";
import Reducer from "../../../Reducer/Reducer";
import TodoList from "../TodoList/TodoList";
import { addToDo } from "../../../Services/TodoServices";

describe("TodoList", () => {

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



  test("Add todo to the pending list, reflect on the pending list and completed list should be null", async () => {
    Setup();
    expect(screen.queryByRole("list-group")).toBeNull();
    expect(screen.getByRole("listitem")).toHaveTextContent(
      "Meeting with Anurag"
    );
  });



  test("Mark as done the todo", async () => {
    Setup();
    await addToDo({
      title: "Meeting with Anurag",
      status: "pending",
      duration: null,
    });
    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /Mark As Done/i }));
    });

    expect(screen.queryByRole("list-group")).toBeNull();
  });



  test(
    "Start Meeting, stop meeting, check the pending list to be" +
      "null and meeting which stopped will be in cpleted list",
    async () => {
      Setup();

      await act(async () => {
        userEvent.click(screen.getByRole("button", { name: /Start/i }));
      });

      expect(screen.getByRole("listitem")).toHaveTextContent("00 : 00 : 00");

      await act(async () => {
        userEvent.click(screen.getByRole("button", { name: /Stop/i }));
      });

      expect(screen.queryByRole("list-group")).toBeNull();
      expect(screen.getByRole("listitem")).toHaveTextContent(
        "Meeting with Anurag"
      );
      expect(screen.getByRole("listitem")).toHaveTextContent(
        "00 : 00 : 00 Time elapsed"
      );
    }
  );




  



  test("Start one meeting in pending list and other pending start wil be inactive", async () => {
    const InitialState = {
      basket: [
        { title: "Meeting with Anurag", status: "pending", duration: null },
        { title: "Meeting with Kirushan", status: "pending", duration: null },
        { title: "Meeting with Arun", status: "pending", duration: null },
      ],
      started: false,
    };
    render(
      <StateProvider initialState={InitialState} reducer={Reducer}>
        <TodoList />
      </StateProvider>
    );

    const items = screen.getAllByRole("button", { name: /Start/i });
    expect(items).toHaveLength(3);

    await act(async () => {
      userEvent.click(items[0]);
    });

    const diabledButtons = screen.getAllByRole("button", { name: /Start/i });
    diabledButtons.forEach((n) => {
      expect(n).toBeDisabled();
    });

    
  });



  test("Remove a todo from pending list", async () => {
    const InitialState = {
      basket: [
        { title: "Meeting with Anurag", status: "pending", duration: null },
        { title: "Meeting with Kirushan", status: "pending", duration: null },
        { title: "Meeting with Arun", status: "pending", duration: null },
      ],
      started: false,
    };
    render(
      <StateProvider initialState={InitialState} reducer={Reducer}>
        <TodoList />
      </StateProvider>
    );
    const item = screen.getAllByRole("listitem");
    const items = screen.getAllByLabelText("Close");
    expect(items).toHaveLength(3);

    await act(async () => {
      userEvent.click(items[0]);
    });

    await waitFor(() => {
      expect(item[0]).not.toBeInTheDocument();
    });

  
  });



  test("Remove a todo from completed list", async () => {
    const InitialState = {
      basket: [
        { title: "Meeting with Anurag", status: "pending", duration: null },
        { title: "Meeting with Kirushan", status: "pending", duration: null },
        { title: "Meeting with Arun", status: "pending", duration: null },
      ],
      started: false,
    };
    render(
      <StateProvider initialState={InitialState} reducer={Reducer}>
        <TodoList />
      </StateProvider>
    );

    const startButton = screen.getAllByRole("button", { name: /Start/i });
    await act(async () => {
      userEvent.click(startButton[0]);
    });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems[0]).toHaveTextContent("00 : 00 : 00");

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /Stop/i }));
    });

    const item = screen.getAllByRole("listitem");
    expect(item[2]).toHaveTextContent("Meeting with Anurag");

    const items = screen.getAllByLabelText("Close");
    expect(items).toHaveLength(3);

    await act(async () => {
      userEvent.click(items[2]);
    });

    await waitFor(() => {
      expect(item[2]).not.toBeInTheDocument();
    });

 
  });



//   test(
//     "Start timer and stop timer",
//     async () => {
//       Setup();

//       await act(async () => {
//         userEvent.click(screen.getByRole("button", { name: /Start/i }));
//       });

//       expect(screen.getByRole("listitem")).toHaveTextContent("00 : 00 : 00");

//       await act(async () => {
//         userEvent.click(screen.getByRole("button", { name: /Stop/i }));
//       });

//       expect(screen.queryByRole("list-group")).toBeNull();
//       expect(screen.getByRole("listitem")).toHaveTextContent(
//         "Meeting with Anurag"
//       );
//       expect(screen.getByRole("listitem")).toHaveTextContent(
//         "00 : 00 : 00 Time elapsed"
//       );
//     }
//   );


});
