import React from "react";
import { shallow } from "enzyme";

import BookCard from "./BookCard";

describe("<BookCard />", () => {
  const book = {
    amount: 1,
    author: "Arielle Howe",
    id: "KXWxtmgYNC",
    imageUrl: "http://placeimg.com/220/280/tech",
    returnDate: "2020-09-15",
    title: "Shocking for hurl precipitate",
  };
  const handleRentingBooks = () => {};

  it("should correct book props", () => {
    const component = shallow(
      <BookCard book={book} handleRentingBooks={handleRentingBooks} />
    );
  });
});
