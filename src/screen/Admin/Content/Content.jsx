import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/ServiceContext";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Content = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const usersCollectionRef = collection(db, "content");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("Top");
  const [content, setContent] = useState("");
  const [numberPosition, setNumberPosition] = useState(0);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [check, setCheck] = useState(true);
  const [banner, setBanner] = useState("");
  const createContent = async () => {
    await addDoc(usersCollectionRef, {
      title: title,
      position: position,
      numberPosition: Number(numberPosition),
      content: content,
      image: image,
      banner: banner,
    });
    navigate("/admin");
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImage(downloadURL);
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleInputBanner = () => {
    setCheck(!check);
    setBanner("");
  };
  let width = window.innerWidth;
  const [open, setOpen] = useState(false);
  const HandleOpenMenu = () => {
    if (open) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  return (
    <div>
      <Row className=" pannelAdmin overflow-hidden m-0">
        <Col md={2} className={open ? "sidebar active p-0" : "sidebar p-0"}>
          <div className="menu d-flex flex-column justify-content-between">
            <div className="menu-head">
              <div className="menu-headLogo sidebar-logo">
                <img src="./image/Logo.png" alt="" />
              </div>
              <div className="menu-headAdmin sidebar-avatar d-flex align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <p>{user && user.email}</p>
              </div>
              <div className="menu-headDirection">
                <ul>
                  <Link to="../admin">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-solid fa-palette fa-2x" />
                      <span className="nav-text">Admin</span>
                    </li>
                  </Link>
                  <Link to="../admin/content">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-sharp fa-solid fa-file-contract fa-2x" />
                      <span className="nav-text">Content</span>
                    </li>
                  </Link>
                  <Link to="../admin/contact">
                    <li className="headDirection d-flex align-items-center ">
                      <i class="fa-solid fa-address-book fa-2x" />
                      <span className="nav-text">Contact</span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="menu-bot d-flex align-items-center justify-content-center flex-column">
              <ul>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="headDirection d-flex align-items-center "
                    variant="danger"
                  >
                    <i className="fa-sharp fa-solid fa-right-from-bracket fa-2x" />
                    <span className="nav-text">Logout</span>
                  </Button>
                </li>
                <li className={width < 768 ? "" : "d-none"}>
                  <Button
                    onClick={HandleOpenMenu}
                    className="headDirection d-flex align-items-center "
                  >
                    <i className="fa-solid fa-up-right-and-down-left-from-center fa-2x" />
                    <span className="nav-text">Close</span>
                  </Button>
                </li>
              </ul>
            </div>
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
                  <Button onClick={createContent}>Add</Button>
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
                    value={banner}
                    onChange={(e) => setBanner(e.target.value)}
                    className="inputBanner"
                    disabled={check}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
          </Form>
          <h2>Description</h2>
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
        </Col>
      </Row>
    </div>
  );
};

export default Content;
