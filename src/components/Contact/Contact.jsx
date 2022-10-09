import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
} from "react-admin";
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
