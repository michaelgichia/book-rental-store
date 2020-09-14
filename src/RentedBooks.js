/**
 * Rented books component
 */
import React from "react";
import { Table, DatePicker, Button, Tooltip } from "antd";
import moment from "moment";

export function handlePriceCalculation(book) {
  if (book.category === "fiction") {
    if (book.daysRented < 4) {
      return <span>$ 4.5</span>;
    } else {
      let fictionExtraDays = book.daysRented - 3;
      let fictionAmountForExtraDays = fictionExtraDays * 3;
      let fictionTotal = 4.5 + fictionAmountForExtraDays;
      return <span>$ {fictionTotal}</span>;
    }
  } else {
    if (book.daysRented < 3) {
      return <span>$ 2</span>;
    } else {
      let extraDays = book.daysRented - 2;
      let amountForExtraDays = extraDays * 1.5;
      let total = 2 + amountForExtraDays;
      return <span>$ {total}</span>;
    }
  }
}

export function handleTotal(books) {
  let summary = 0;
  books.forEach((book) => {
    if (book.category === "fiction") {
      if (book.daysRented < 4) {
        summary += 4.5;
      } else {
        let fictionExtraDays = book.daysRented - 3;
        let fictionAmountForExtraDays = fictionExtraDays * 3;
        let fictionTotal = 4.5 + fictionAmountForExtraDays;
        summary += fictionTotal;
      }
    } else {
      if (book.daysRented < 3) {
        summary += 2;
      } else {
        let extraDays = book.daysRented - 2;
        let amountForExtraDays = extraDays * 1.5;
        let total = 2 + amountForExtraDays;
        summary += total;
      }
    }
  });
  return summary;
}

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
          let daysRented = moment(dateString)
            .endOf("day")
            .diff(moment().startOf("day"), "days");
          return { ...node, returnDate: dateString, amount, daysRented };
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
            <span>
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
              <span className="table-title">{text}</span>
            </span>
          ),
        },
        {
          title: "Return date",
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
          title: "Amount",
          key: "amount",
          dataIndex: "amount",
          align: "right",
          render: (_, book) => handlePriceCalculation(book),
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
            <h3>$ {handleTotal(dataSource)}</h3>
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
            <Button type="danger" size="large" htmlType="submit">
              PRINT
            </Button>
          </div>
        </div>
      )}
    />
  );
}

export default RentedBooks;
