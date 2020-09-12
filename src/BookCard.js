/**
 * Book card display information about a book
 */
import React from "react";
import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./book-card.css";

export function BookCard(props) {
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
        <img src="https://placeimg.com/220/280/fashion" alt="fashion" />
      </div>
      <h3 className="title book-title">Learn python the hard way</h3>
      <h3 className="title book-author">Michael Gichia</h3>
    </div>
  );
}

export default BookCard;
