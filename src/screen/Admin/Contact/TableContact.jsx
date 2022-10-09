import React from "react";

const TableContact = ({ lists }) => {
  return (
    <tr key={lists.email}>
      <td>{lists.name}</td>
      <td>{lists.email}</td>
      <td>{lists.subject}</td>
      <td>{lists.message}</td>
      <td>{new Date(lists.createDate.seconds * 1000).toLocaleString()}</td>
      <td>{new Date(lists.ModifiedDate.seconds * 1000).toLocaleString()}</td>
    </tr>
  );
};

export default TableContact;
