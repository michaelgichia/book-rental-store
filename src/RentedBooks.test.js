import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";

import RentedBooks from "./RentedBooks";

it("RentedBooks renders without crashing", () => {
  shallow(<RentedBooks />);
});
