/**
 * Rented books component
 */
import React from "react";
import { Table, DatePicker, Button, Tooltip } from "antd";
import moment from "moment";

export function RentedBooks({
  dataSource,
  clearBooksFromStorage,
  removeOneBookFromStorage,
  setRentendBooks,
}) {
  function onChange(_, dateString, node) {
    setRentendBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id === node.id) {
          let amount = moment(dateString)
            .endOf("day")
            .diff(moment().startOf("day"), "days");
          return { ...node, returnDate: dateString, amount };
        }
        return book;
      })
    );
  }

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  return (
    <Table
      columns={[
        {
          title: "Title",
          dataIndex: "title",
          ellipsis: true,
          width: "50%",
          render: (text, book) => (
            <span className="table-title">
              <Tooltip title="Remove book">
                <Button
                  shape="circle"
                  type="text"
                  ghost
                  onClick={() => removeOneBookFromStorage(book)}
                >
                  x
                </Button>
              </Tooltip>
              {text}
            </span>
          ),
        },
        {
          title: "Date",
          key: "returnDate",
          dataIndex: "returnDate",
          render: (_, node) => {
            return (
              <DatePicker
                format="YYYY-MM-DD"
                defaultValue={moment(moment().add(1, "days"), "YYYY-MM-DD")}
                onChange={(date, dateString) =>
                  onChange(date, dateString, node)
                }
                disabledDate={disabledDate}
                mode="date"
              />
            );
          },
          width: 150,
        },
        {
          title: "Days",
          key: "returnDate",
          dataIndex: "returnDate",
          align: "right",
          render: (date) => {
            return (
              <span>
                {moment(date)
                  .endOf("day")
                  .diff(moment().startOf("day"), "days")}
              </span>
            );
          },
        },
        {
          title: "Amount",
          key: "amount",
          dataIndex: "amount",
          align: "right",
          render: (amount) => <span>$ {amount}</span>,
        },
      ]}
      dataSource={dataSource}
      pagination={false}
      rowKey="id"
      locale={{
        emptyText: "No books added",
      }}
      size="small"
      footer={() => (
        <div className="rented-books-table-footer">
          <div className="rented-books-charges">
            <h3>Total</h3>
            <h3>$ {`${dataSource.reduce((a, c) => a + c.amount, 0)}`}</h3>
          </div>
          <div className="receipt-print-btn">
            <Button
              ghost
              type="danger"
              size="large"
              onClick={() => clearBooksFromStorage()}
            >
              CLEAR
            </Button>
            <Button type="danger" size="large">
              PRINT
            </Button>
          </div>
        </div>
      )}
    />
  );
}

export default RentedBooks;
