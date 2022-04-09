import {
  NumberField,
  TextField,
  DateField,
  Datagrid,
  List,
  EditButton,
  DeleteButton,
} from "react-admin";

export const ProductList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" disabled />
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="images" />
      <TextField source="unit" />
      <NumberField source="price.priceGross" label="Price" />
      <TextField source="substitutes" />
      <TextField source="categories.subCategories" label="Categories" />
      <DateField source="description" />
      <NumberField source="countInStock" />
      <EditButton basePath="/products" />
    </Datagrid>
  </List>
);
