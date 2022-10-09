import React from "react";

const TableContact = ({ lists }) => {
  console.log("Table Content");
  console.log("Table Content not map");
  console.log(lists);
  return (
    <tbody>
      <tr key={lists.email}>
        <td>{lists.name}</td>
        <td>{lists.email}</td>
        <td>{lists.subject}</td>
        <td>{lists.message}</td>
        <td>{lists.createDate.seconds}</td>
        <td>{lists.ModifiedDate.seconds}</td>
      </tr>
    </tbody>
  );
};

export default TableContact;
