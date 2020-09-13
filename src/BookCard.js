/**
 * Book card display information about a book
 */
import React from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./App.css";

export function BookCard({ book }) {
  return (
    <div id="book-card">
      <div id="action-btn">
        <Tooltip title="Rent book">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            type="primary"
            style={{ borderWidth: 2 }}
          />
        </Tooltip>
      </div>
      <div id="book-card-image-wrapper">
        <img src={book.imageUrl} alt={book.title} />
      </div>
      <h3 className="title book-title truncate-text">{book.title}</h3>
      <h3 className="title book-author">{book.author}</h3>
    </div>
  );
}

export default BookCard;
