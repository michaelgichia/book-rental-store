import React from "react";
import { shallow, mount } from "enzyme";

import ReceiptDocument from "./ReceiptDocument";

describe("<ReceiptDocument />", () => {
  const rentedBooks = [
    {
      amount: 1,
      author: "Arielle Howe",
      id: "KXWxtmgYNC",
      imageUrl: "http://placeimg.com/220/280/tech",
      returnDate: "2020-09-15",
      title: "Shocking for hurl precipitate",
    },
  ];
  const user = {
    firstName: "Michael",
    lastName: "Gichia",
    phoneNumber: "0710853398",
    email: "gichuru.gichia@gmail.com",
  };

  it("should test ReceiptDocument component with default state of empty array", () => {
    const component = shallow(
      <ReceiptDocument dataSource={[]} user={user} display={true} />
    );
    expect(component).toMatchSnapshot();
  });

  it("should test ReceiptDocument component without user information", () => {
    const component = shallow(
      <ReceiptDocument dataSource={[]} user={{}} display={true} />
    );
    expect(component).toMatchSnapshot();
  });

  it("should display rented books", () => {
    shallow(
      <ReceiptDocument dataSource={rentedBooks} user={user} display={true} />
    );
  });
});
