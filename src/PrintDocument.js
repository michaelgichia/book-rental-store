/**
 * Document to print
 */
import React from "react";
import { Table, Row, Col, Divider } from "antd";

export function PrintDocument({ dataSource, user }) {
  return (
    <Row className="printme">
      <Col span={24}>
        <Divider orientation="left">Personal information</Divider>
      </Col>
      <Col span={24}>
        <p>
          {user.firstName || ""} {user.lastName || ""}
        </p>
      </Col>
      <Col span={24}>
        <p>{user.phoneNumber || ""}</p>
      </Col>
      <Col span={24}>
        <p>{user.email || ""}</p>
      </Col>
      <Col span={24}>
        <Divider orientation="left">Books</Divider>
      </Col>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            ellipsis: true,
            width: "50%",
          },
          {
            title: "Return date",
            key: "returnDate",
            dataIndex: "returnDate",
            align: "right",
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
        size="small"
        footer={() => (
          <div className="print-doc-footer">
            <h3>
              Total: $ {`${dataSource.reduce((a, c) => a + c.amount, 0)}`}
            </h3>
          </div>
        )}
      />
    </Row>
  );
}

export default PrintDocument;
