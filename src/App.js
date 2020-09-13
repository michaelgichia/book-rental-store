import React from "react";
import { Layout, Input, Row, Col, Form, Divider } from "antd";
import dataSource from "./dataSource";
import { BookCard } from "./BookCard";
import { RentedBooks } from "./RentedBooks";
import "./App.css";
import logo from "./logo.png";
const data = dataSource(50);
console.log({ data });

// constants
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

function App() {
  const [form] = Form.useForm();
  const [books, setBooks] = React.useState(data);

  const onFinish = (values) => {
    console.log("Finish:", values);
  };
  return (
    <Layout>
      <Header id="main-header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1>Book Rental Store</h1>
        <div className="placeholder-div" />
      </Header>
      <Layout id="site-layout">
        <Content id="left-main-content">
          <Row className="left-main-row" gutter="10">
            <Col span={24}>
              <Search
                placeholder="input book title"
                enterButton="Search"
                size="large"
                style={{ width: "100%", marginBottom: 30 }}
                onSearch={(value) => console.log(value)}
              />
            </Col>
          </Row>
          <Row gutter={[10, 10]} className="left-main-row">
            {books.map((book) => (
              <Col key={book.id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }} id="footer">
          Book Rental Store management system
        </Footer>
      </Layout>
      <Sider id="sider-content" width="50%">
        <Form form={form} name="user_information" onFinish={onFinish}>
          <Row gutter={24} className="left-main-row">
            <Col span={24}>
              <Divider orientation="left">Personal information</Divider>
            </Col>
            <Col span={12} sm={24} md={12}>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name" },
                ]}
              >
                <Input size="large" placeholder="First name" />
              </Form.Item>
            </Col>
            <Col span={12} sm={24} md={12}>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name" },
                ]}
              >
                <Input size="large" type="text" placeholder="Last name" />
              </Form.Item>
            </Col>
            <Col span={12} sm={24} md={12}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input your phone number" },
                ]}
              >
                <Input size="large" placeholder="Phone number" />
              </Form.Item>
            </Col>
            <Col span={12} sm={24} md={12}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your email" }]}
              >
                <Input size="large" type="text" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider orientation="left">Books</Divider>
            </Col>
            <Col span={24}>
              <RentedBooks />
            </Col>
          </Row>
        </Form>
      </Sider>
    </Layout>
  );
}

export default App;
