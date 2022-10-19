import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Dashboard.css";
import { Row, Col, Button } from "react-bootstrap";
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
      console.log("you logout");
    } catch (e) {
      console.log(e.message);
    }
  };
  const updateContent = async (id) => {
    navigate(`../admin/content/${id}`);
  };
  const deleteContent = async (id) => {
    if (window.confirm("Do you want to delete ?")) {
      const contentDoc = doc(db, "content", id);
      await deleteDoc(contentDoc);
      console.log("deleted");
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
    <div className="pannelAdmin">
      <Row className="overflow-hidden">
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
                  <Link to="./content">
                    <i className="fa fa-laptop fa-2x" />
                    <span className="nav-text">Content</span>
                  </Link>
                </li>
                <li className="has-subnav">
                  <Link to="./contact">
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
        <Col md={10} className="p-0">
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
