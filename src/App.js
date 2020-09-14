import React from "react";
import { Layout, Input, Row, Col, Form, Divider, Empty } from "antd";
import moment from "moment";
import dataSource from "./dataSource";
import { BookCard } from "./BookCard";
import { RentedBooks } from "./RentedBooks";
import { ReceiptDocument } from "./ReceiptDocument";
import "./App.css";
import logo from "./logo.png";
import { useLocalStorage } from "./customHooks";

// constants
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const data = dataSource(50);

const priceByCategory = {
  regular: 1.5,
  fiction: 3,
  novel: 1.5,
};

function App() {
  const [form] = Form.useForm();
  const [user, setUser] = React.useState({});
  const [books, setBooks] = React.useState(data);
  const [rentedBooks, setRentendBooks] = useLocalStorage("rented-books", []);
  const [search, setSearch] = React.useState("");
  const printContainer = React.useRef(null);
  const iframeContainer = React.useRef(null);

  React.useEffect(() => {
    if (search.length < 1) {
      setBooks(data);
    }
  }, [search]);

  const onFinish = (values) => {
    setUser(values);
    const content = printContainer.current;
    const iframe = iframeContainer.current.contentWindow;
    iframe.document.open();
    iframe.document.write(content.innerHTML);
    iframe.document.close();
    iframe.focus();
    iframe.print();
  };

  function handleRentingBooks(book) {
    setRentendBooks((prevBooks) => {
      if (prevBooks.some((prevbook) => prevbook.id === book.id)) {
        return prevBooks;
      } else {
        book.returnDate = moment().add("days", 1).format("YYYY-MM-DD");
        book.amount = priceByCategory[book.category];
        return [book, ...prevBooks];
      }
    });
  }

  function removeOneBookFromStorage(book) {
    setRentendBooks((prevBooks) => prevBooks.filter((bk) => bk.id !== book.id));
  }

  function handleSearch(params) {
    setBooks((args) =>
      args.filter((book) => {
        let bookTitle = book.title.toLocaleLowerCase();
        let bookAuthor = book.author.toLocaleLowerCase();
        let searchInput = params.toLocaleLowerCase();
        return (
          bookTitle.includes(searchInput) || bookAuthor.includes(searchInput)
        );
      })
    );
  }

  function renderBookList() {
    return (
      <>
        {books.length > 0 ? (
          <Row gutter={[10, 10]} className="left-main-row">
            {books.map((book) => (
              <Col key={book.id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                <BookCard book={book} handleRentingBooks={handleRentingBooks} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="empty-books-wrapper">
            <Empty description="No books found" />
          </div>
        )}
      </>
    );
  }

  function renderForm() {
    return (
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
            rules={[{ required: true, message: "Please input your last name" }]}
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
      </Row>
    );
  }

  function renderRentedBooks() {
    return (
      <Row gutter={24}>
        <Col span={24}>
          <Divider orientation="left">Books</Divider>
        </Col>
        <Col span={24}>
          <RentedBooks
            dataSource={rentedBooks}
            clearBooksFromStorage={() => setRentendBooks([])}
            removeOneBookFromStorage={removeOneBookFromStorage}
            setRentendBooks={setRentendBooks}
          />
        </Col>
      </Row>
    );
  }

  function renderSearchInput() {
    return (
      <Row className="left-main-row" gutter="10">
        <Col span={24}>
          <Search
            placeholder="input book title"
            enterButton="Search"
            size="large"
            style={{ width: "100%", marginBottom: 30 }}
            onSearch={handleSearch}
            allowClear
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Layout>
      <iframe
        ref={iframeContainer}
        style={{ height: 0, width: 0, position: "absolute" }}
        title="print receipt here"
      />
      <Header id="main-header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1>Book Rental Store</h1>
        <div className="placeholder-div" />
      </Header>
      <Layout id="site-layout">
        <Content id="left-main-content">
          {renderSearchInput()}
          {renderBookList()}
        </Content>
        <Footer style={{ textAlign: "center" }} id="footer">
          Book Rental Store management system
        </Footer>
      </Layout>
      <Sider id="sider-content" width="50%">
        <Form
          form={form}
          name="user_information"
          onFinish={onFinish}
          scrollToFirstError
        >
          {renderForm()}
          {renderRentedBooks()}
          <div ref={printContainer}>
            <ReceiptDocument dataSource={rentedBooks} user={user} />
          </div>
        </Form>
      </Sider>
    </Layout>
  );
}

export default App;
