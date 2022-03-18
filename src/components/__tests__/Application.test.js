import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  getByText,
  prettyDOM,
  fireEvent,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByTestId
} from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";
import Appointment from "components/Appointment";

afterEach(cleanup);
describe("Appointment Component", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    const element = await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
});

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  
  });
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
    
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    const { container} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    //click on edit image
    fireEvent.click(queryByAltText(appointment, "Edit"));
    //show form with input value as Archie Cohen
    const input =getByTestId(appointment,'student-name-input');
    expect(input).toHaveValue('Archie Cohen')
    //change the input value and select different interviewer
    fireEvent.change(input,{target:{
        value:'Jang Walia'
    }})
    fireEvent.click(getByAltText(appointment,'Sylvia Palmer'))
    //click on save button to confirm
    fireEvent.click(getByText(appointment, "Save"));
    //make sure saving is showing 
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //new appointment with changed value
    await waitForElement(()=> getByText(container,"Jang Walia"));
    // spots remaining should be unchanged
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
})
it("shows the save error when failing to save an appointment", async() => {
  axios.put.mockRejectedValueOnce();
  const { container} = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" },
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
  await waitForElement(()=>getByText(appointment,"Error"))
  expect(getByText(appointment,"Can't Create appointment.."))
  //close the error message and return back to Add button
  fireEvent.click(getByAltText(appointment,'Close'))
  expect(getByAltText(appointment,"Add")).toBeInTheDocument()
});
it("shows the delete error when failing to delete an existing appointment", async()=>{

  axios.delete.mockRejectedValueOnce();
  const { container} = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment,"Are you sure you would like to delete?")).toBeInTheDocument()
  fireEvent
  fireEvent.click(getByText(appointment, "Confirm"));
  await waitForElement(()=>getByText(appointment,"Error"))
  expect(getByText(appointment,"Can't remove appointment"))
  fireEvent.click(getByAltText(appointment,'Close'))
  expect(getByText(appointment,"Archie Cohen")).toBeInTheDocument()
})
});
