import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "./Dashboard.css";
import { Row, Col, Button, Alert, Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [lists, setList] = useState([]);
  useEffect(() => {
    const getDatas = async () => {
      const contactCollectionRef = collection(db, "content");

      const data = await getDocs(contactCollectionRef);
      setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDatas();
  }, []);
  let confirm = false;

  // console.log(lists[0].id);
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
      console.log("you logout");
    } catch (e) {
      console.log(e.message);
    }
  };
  const deleteContent = async (id) => {
    const contentDoc = doc(db, "content", id);
    console.log(contentDoc);
    await deleteDoc(contentDoc);
    console.log("deleted");
  };
  const Modify = (data, row) => {
    console.log(data);
    return (
      <>
        <Button variant="primary">update</Button>
        <Button variant="danger" onClick={() => alert(data ? "null" : data)}>
          delete
        </Button>
      </>
    );
  };
  const tesst = (data, row) => {
    return <span>test={data}</span>;
  };

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
      // formatter: tesst,
    },
    {
      dataField: "numberPosition",
      text: "Number",
      sort: true,
    },
    {
      dataField: "position",
      text: "Position",
    },
    {
      dataField: "image",
      text: "Image",
    },
    {
      dataField: "content",
      text: "Message",
    },
    {
      dataField: "Modify",
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
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
