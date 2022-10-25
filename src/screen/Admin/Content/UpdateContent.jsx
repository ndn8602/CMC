import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../../../context/ServiceContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Row, Col, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
const UpdateContent = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { user, logout, getContent, updateContent } = UserAuth();
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("Top");
  const [content, setContent] = useState("");
  const [numberPosition, setNumberPosition] = useState(0);
  const [image, setImage] = useState("");
  const [file, setFile] = useState(undefined);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [check, setCheck] = useState(true);
  const [banner, setBanner] = useState("");
  const [per, setperc] = useState(null); //percentage
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(message);
    }
  };
  console.log(`image: ${image}`);

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
      image: image,
    };
    console.log(newContent);
    try {
      if (id !== undefined && id !== "") {
        if (window.confirm("Are you sure ?")) {
          await updateContent(id, newContent);
        }
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
    navigate("../admin");
  };
  useEffect(() => {
    const uploadFile = () => {
      try {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setperc(progress);
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
      } catch (e) {
        console.log(e.message);
      }
    };
    file && uploadFile();
  }, [file]);
  const comebackAdmin = () => {
    navigate("../admin");
  };
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
        setImage(docSnap.data().image);
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
                <img src="../../image/Logo.png" alt="" />
              </div>
              <div className="menu-headAdmin sidebar-avatar d-flex align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <p className={open || width > 768 ? "" : "d-none"}>
                  {user && user.email}
                </p>
              </div>
              <div className="menu-headDirection">
                <ul>
                  <Link to="../admin">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-solid fa-palette fa-2x" />
                      <span
                        className={open || width > 768 ? "nav-text" : "d-none"}
                      >
                        Contents
                      </span>
                    </li>
                  </Link>
                  <Link to="../admin/content">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-sharp fa-solid fa-file-contract fa-2x" />
                      <span
                        className={open || width > 768 ? "nav-text" : "d-none"}
                      >
                        Add New Content
                      </span>
                    </li>
                  </Link>
                  <Link to="../admin/contact">
                    <li className="headDirection d-flex align-items-center ">
                      <i className="fa-solid fa-phone fa-2x"></i>

                      <span
                        className={open || width > 768 ? "nav-text" : "d-none"}
                      >
                        Contacts
                      </span>
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
                    variant="warning"
                  >
                    <i className="fa-sharp fa-solid fa-right-from-bracket fa-2x" />
                    <span
                      className={open || width > 768 ? "nav-text" : "d-none"}
                    >
                      Logout
                    </span>
                  </Button>
                </li>
                <li className={width < 768 ? "" : "d-none"}>
                  <Button
                    onClick={HandleOpenMenu}
                    className="headDirection d-flex align-items-center "
                  >
                    <i className="fa-solid fa-up-right-and-down-left-from-center fa-2x" />
                    <span
                      className={open || width > 768 ? "nav-text" : "d-none"}
                    >
                      Close
                    </span>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Col>

        {/* <!--- Content ---> */}
        <Col md={10} className="TitleAdmin">
          <Alert variant="secondary text-center font-weight-bold">
            <h3>UPDATE CONTENT</h3>
          </Alert>
          <Form onSubmit={handleSubmit}>
            <Row className="m-0 ">
              <Row>
                <Col md={2}>Update Content</Col>
                <Col md={8}></Col>
                <Col md={1}>
                  <Button type="submit" disabled={per !== null && per < 100}>
                    Update
                  </Button>
                </Col>
                <Col md={1}>
                  <Button onClick={comebackAdmin}>Cancel</Button>
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
        </Col>
      </Row>
    </div>
  );
};

export default UpdateContent;
