import React from "react";
import { Table, DatePicker, Button } from "antd";
import moment from "moment";

function onChange(date, dateString) {
  console.log(date, dateString);
}

function disabledDate(current) {
  return current && current < moment().endOf("day");
}

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    ellipsis: true,
    width: "50%",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <DatePicker
        format="YYYY-MM-DD"
        defaultValue={moment(moment().add(1, "days"), "YYYY-MM-DD")}
        onChange={onChange}
        disabledDate={disabledDate}
      />
    ),
    width: 150,
  },
  {
    title: "Days",
    dataIndex: "noOfDays",
    render: (date, node, args, argss) => {
      console.log({ argss });
      return <span>3</span>;
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];
const data = [
  {
    key: "1",
    title: "Learn Python the hard way",
    noOfDays: 32,
    amount: "$ 10",
  },
  {
    key: "2",
    title: "Learn Java the hard way",
    noOfDays: 42,
    amount: "$ 10",
  },
  {
    key: "3",
    title: "Learn CSS the hard way",
    noOfDays: 32,
    amount: "$ 10",
  },
  {
    key: "4",
    title: "Learn JavaScript the hard way",
    noOfDays: 99,
    amount: "$ 10",
  },
];

export function RentedBooks(params) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      footer={() => (
        <div className="rented-books-table-footer">
          <div className="rented-books-charges">
            <h3>Total</h3>
            <h3>$ 1200</h3>
          </div>
          <Button type="danger" size="large" className="receipt-print-btn">
            PRINT
          </Button>
        </div>
      )}
    />
  );
}

export default RentedBooks;
