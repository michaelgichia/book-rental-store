import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";

import App from "./App";

it("App renders without crashing", () => {
  shallow(<App />);
});
