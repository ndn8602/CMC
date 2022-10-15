import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Row,
  Col,
  Button,
  Alert,
  Form,
  Navbar,
  Container,
} from "react-bootstrap";
import Ckeditor from "./Ckeditor";

const Content = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [content, setContent] = useState("");
  const [numberPosition, setNumberPosition] = useState(0);
  const [imageUpload, setImageUpload] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(e.message);
    }
  };
  console.log(title);
  console.log(numberPosition);
  console.log(position);
  console.log(content);
  return (
    <div className="pannelAdmin">
      <Row className=" overflow-hidden">
        <Col md={2} className="sidebar">
          <div className="area">
            <nav className="main-menu">
              <div className="sidebar-logo">
                <img src="./image/Logo.png" alt="" />
              </div>
              <div className="sidebar-avatar">
                <img
                  src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <span>{user && user.email}</span>
              </div>
              <ul>
                <li className="has-subnav">
                  <Link to="../admin">
                    <i className="fa fa-laptop fa-2x" />
                    <span className="nav-text">Admin</span>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="../admin/content">
                    <i className="fa fa-laptop fa-2x" />
                    <span className="nav-text">Content</span>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="../admin/contact">
                    <i className="fa fa-list fa-2x" />
                    <span className="nav-text">Contact</span>
                  </Link>
                </li>
              </ul>

              <ul className="logout">
                <li>
                  <Button onClick={handleLogout}>
                    <i className="fa fa-power-off fa-2x" />
                    <span className="nav-text">Logout</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </Col>
        {/* <!--- Content ---> */}
        <Col md={10} className="">
          <Form>
            <Row className="m-0 ">
              <Row>
                <Col md={2}>Add new content</Col>
                <Col md={8}></Col>
                <Col md={1}>
                  <Button>Add</Button>
                </Col>
                <Col md={1}>
                  <Button>Cancel</Button>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Select onChange={(e) => setPosition(e.target.value)}>
                      <option value={"Top"}>Top</option>
                      <option value={"Mid"}>Mid</option>
                      <option value={"Bottom"}>Bottom</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Number</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Enter You Number"
                      onChange={(e) => setNumberPosition(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
          </Form>
          <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ data });
              setContent(editor.getData());
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
          {content}
        </Col>
      </Row>
    </div>
  );
};

export default Content;
