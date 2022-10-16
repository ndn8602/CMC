import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import { AuthContextProvider } from "../../../context/AuthContext";
const TableContact = ({ lists }) => {
  console.log(lists);
  const convertCreateDate = (data, row) => {
    return new Date(data * 1000).toLocaleString();
  };
  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "subject",
      text: "Subject",
    },
    {
      dataField: "phone",
      text: "Phone",
    },
    {
      dataField: "message",
      text: "Message",
    },
    {
      dataField: "createDate.seconds",
      text: "Create Date",
      formatter: convertCreateDate,
      sort: true,
    },
  ];
  return (
    <>
      <BootstrapTable
        keyField="id"
        data={lists}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        rowStyle={{ whiteSpace: "normal" }}
      />
    </>
  );
};

export default TableContact;

// <tr key={lists.email}>
//   <td>{lists.name}</td>
//   <td>{lists.email}</td>
//   <td>{lists.subject}</td>
//   <td>{lists.message}</td>
//   <td>{new Date(lists.createDate.seconds * 1000).toLocaleString()}</td>
//   <td>{new Date(lists.ModifiedDate.seconds * 1000).toLocaleString()}</td>
// </tr>
