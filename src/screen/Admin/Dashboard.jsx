import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Dashboard.css";
import { Row, Col, Button, Alert } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import ReactHtmlParser from "react-html-parser";
import { UserAuth } from "../../context/ServiceContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [lists, setList] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const contactCollectionRef = collection(db, "content");
    const q = query(contactCollectionRef, orderBy("numberPosition", "asc"));
    const data = onSnapshot(q, (snapshot) =>
      setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
    return data;
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (e) {}
  };
  let width = window.innerWidth;

  const updateContent = async (id) => {
    navigate(`../admin/content/${id}`);
  };
  const deleteContent = async (id) => {
    if (window.confirm("Do you want to delete ?")) {
      const contentDoc = doc(db, "content", id);
      await deleteDoc(contentDoc);
    }
  };
  const Modify = (data, row) => {
    return (
      <>
        <Button
          variant="primary"
          className="mb-1"
          onClick={() => updateContent(data)}
        >
          update
        </Button>
        <Button
          variant="danger"
          className="mt-3"
          onClick={() => deleteContent(data)}
        >
          delete
        </Button>
      </>
    );
  };
  const HandleOpenMenu = () => {
    if (open) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  const convertHtml = (data, row) => {
    return ReactHtmlParser(data);
  };
  const convertImg = (data, row) => {
    return <img src={data} alt="" style={{ heigh: 200, width: 200 }} />;
  };

  const defaultSortedBy = [
    {
      dataField: "position",
      order: "desc", // or asc
    },
  ];
  const columns = [
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "numberPosition",
      text: "Number",
      sort: true,
    },
    {
      dataField: "position",
      text: "Position",
      sort: true,
    },
    {
      dataField: "image",
      text: "Image",
      formatter: convertImg,
    },
    {
      dataField: "content",
      text: "Message",
      formatter: convertHtml,
    },
    {
      dataField: "banner",
      text: "Banner",
    },
    {
      dataField: "id",
      text: "Modify",
      formatter: Modify,
    },
  ];
  return (
    <div>
      <Row className=" pannelAdmin overflow-hidden m-0">
        <Col md={2} className={open ? "sidebar active p-0" : "sidebar p-0"}>
          <div className="menu d-flex flex-column justify-content-between">
            <div className="menu-head">
              <div className="menu-headLogo sidebar-logo">
                <img src="./image/Logo.png" alt="" />
              </div>
              <div className="menu-headAdmin sidebar-avatar">
                <img
                  src="https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt=""
                />
                <p className={open ? "" : "d-none"}>{user && user.email}</p>
              </div>
              <div className="menu-headDirection">
                <ul>
                  <Link to="../admin">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-solid fa-palette fa-2x" />
                      <span className="nav-text">Contents</span>
                    </li>
                  </Link>
                  <Link to="./content">
                    <li className=" headDirection d-flex align-items-center ">
                      <i className="fa-sharp fa-solid fa-file-contract fa-2x" />
                      <span className="nav-text">Add New Content</span>
                    </li>
                  </Link>
                  <Link to="./contact">
                    <li className="headDirection d-flex align-items-center ">
                      <i className="fa-solid fa-phone fa-2x"></i>
                      <span className="nav-text">Contacts</span>
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
        <Col md={10} className="p-0 dashboardTableData">
          <Alert variant="secondary text-center font-weight-bold">
            <h3>CONTENT</h3>
          </Alert>
          <BootstrapTable
            keyField="id"
            data={lists}
            columns={columns}
            striped
            hover
            condensed
            pagination={paginationFactory({ showTotal: false })}
            rowStyle={{ whiteSpace: "normal" }}
            defaultSorted={defaultSortedBy}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
