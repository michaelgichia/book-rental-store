import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import { BookCard } from "./BookCard";
import "./App.css";

// constants
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header id="main-header" />
      <Layout id="site-layout">
        <Content id="left-main-content">
          <Row gutter={[10, 10]} id="left-main-row">
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
              <BookCard />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }} id="footer">
          Book Rental Store management system
        </Footer>
      </Layout>
      <Sider id="sider-content" width="50%">
        <h1>Hello Sider</h1>
      </Sider>
    </Layout>
  );
}

export default App;
