import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../../context/ServiceContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
const UpdateContent = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { user, logout, getContent, updateContent } = UserAuth();
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("Top");
  const [content, setContent] = useState("");
  const [numberPosition, setNumberPosition] = useState(0);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [check, setCheck] = useState(true);
  const [banner, setBanner] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (
      title === "" ||
      position === "" ||
      numberPosition === "" ||
      content === "" ||
      file === ""
    ) {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newContent = {
      title: title,
      position: position,
      numberPosition: numberPosition,
      content: content,
      banner: banner,
    };
    console.log(newContent);
    try {
      if (id !== undefined && id !== "") {
        console.log(`id : ${id}`);
        console.log(newContent);
        await updateContent(id, newContent);
        setMessage({ error: false, msg: "Updated successfully!" });
      }
    } catch (err) {
      console.log(newContent);
      setMessage({ error: true, msg: err.message });
    }
    setTitle("");
    setPosition("");
    setNumberPosition("");
    setContent("");
    setBanner("");
    setCheck(false);
    // navigate("../admin");
  };
  console.log(message);

  useEffect(() => {
    const editHandler = async () => {
      setMessage("");
      try {
        const docSnap = await getContent(id);
        console.log("the record is :", docSnap.data());
        setTitle(docSnap.data().title);
        setPosition(docSnap.data().position);
        setNumberPosition(docSnap.data().numberPosition);
        setContent(docSnap.data().content);
        if (docSnap.data().file) {
          setFile(docSnap.data().file);
        } else {
          setFile(null);
        }
        setFile(docSnap.data().file);
        setBanner(docSnap.data().banner);
      } catch (err) {
        setMessage({ error: true, msg: err.message });
      }
    };
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id, navigate]);

  const handleInputBanner = () => {
    setCheck(!check);
    setBanner("");
  };
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
          <Form onSubmit={handleSubmit}>
            <Row className="m-0 ">
              <Row>
                <Col md={2}>Update Content</Col>
                <Col md={8}></Col>
                <Col md={1}>
                  <Button type="submit">Update</Button>
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
                      value={title}
                      type="text"
                      placeholder="Enter Your Name"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    >
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
                      value={numberPosition}
                      placeholder="Enter You Number"
                      onChange={(e) => setNumberPosition(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="banner">
                <Form.Label>Banner</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox
                    value={check}
                    onClick={handleInputBanner}
                  />
                  <Form.Control
                    value={banner ? banner : ""}
                    onChange={(e) => setBanner(e.target.value)}
                    className="inputBanner"
                    disabled={check}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </Form>
          <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
            data={content}
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

export default UpdateContent;
