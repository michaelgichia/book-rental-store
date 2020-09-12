import React from "react";
import { Layout, Menu } from "antd";
import "./App.css";

// constants
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header id="main-header" />
      <Layout id="site-layout">
        <Content id="left-main-content">
          <h1>Hello world</h1>
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
