import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
const TableContact = ({ lists }) => {
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
      dataField: "address",
      text: "Adress",
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
    <div className=" dashboardTableDataContact">
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
    </div>
  );
};

export default TableContact;
