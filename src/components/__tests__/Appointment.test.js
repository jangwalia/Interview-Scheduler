import React from "react";

import { render } from "@testing-library/react";

import Application from "components/Application";

describe("Appointment",()=>{
  it("renders the component without crashing",()=>{
    render(<Application/>)
  })
})
