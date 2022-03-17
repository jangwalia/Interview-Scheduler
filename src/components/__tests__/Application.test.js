import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import Application from "components/Application";
jest.mock("axios");

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
