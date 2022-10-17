import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Button, Form } from "react-bootstrap";
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const UpdateContent = () => {
  const params = useParams();
  const { id } = params;
  // console.log("id");
  // console.log(id);
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const usersCollectionRef = collection(db, "content");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("Top");
  const [content, setContent] = useState("");
  const [numberPosition, setNumberPosition] = useState(0);

  const [file, setFile] = useState("");
  const [dataa, setData] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(e.message);
    }
  };

  const getData = async (id) => {
    // console.log("pass");
    // console.log(id);
    const contentDoc = doc(db, "content", `${id}`);
    const docSnap = await getDoc(contentDoc);
    console.log(docSnap.data());
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
      setTitle(dataa.title);
      setPosition(dataa.position);
      setContent(dataa.content);
      setNumberPosition(dataa.numberPosition);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // console.log(dataa);
  useEffect(() => {
    setTimeout(() => {
      getData(id);
    }, 3000);
  }, [navigate, id]);

  const updateContent = async (
    id,
    title,
    position,
    numberPosition,
    content,
    file
  ) => {
    const contentDoc = doc(db, "content", id);
    console.log("contentDoc");
    await updateDoc(contentDoc, {
      title: title,
      position: position,
      content: content,
      numberPosition: numberPosition,
    });
    alert("updated");
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
          <Form>
            <Row className="m-0 ">
              <Row>
                <Col md={2}>Update Content</Col>
                <Col md={8}></Col>
                <Col md={1}>
                  <Button
                    onClick={() =>
                      updateContent(
                        dataa.id,
                        dataa.title,
                        dataa.position,
                        dataa.numberPosition,
                        dataa.content
                      )
                    }
                  >
                    Update
                  </Button>
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
                      value={dataa.title ? dataa.title : ""}
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
                      value={dataa.position ? dataa.position : ""}
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
                      value={dataa.numberPosition ? dataa.numberPosition : ""}
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
            </Row>
          </Form>
          <h2>Using CKEditor 5 build in React</h2>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(editor.getData());
            }}
            data={dataa.content ? dataa.content : ""}
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
