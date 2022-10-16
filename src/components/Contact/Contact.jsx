import { List, Datagrid, TextField, EditButton } from "react-admin";
export const listContactData = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="price" />

      <EditButton basePath="/products" />
    </Datagrid>
  </List>
);
