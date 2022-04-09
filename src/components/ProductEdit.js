import {
  FileInput,
  TextInput,
  SimpleForm,
  Edit,
  NumberInput,
} from "react-admin";

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="erp_code" disabled />
      <TextInput source="ean" />
      <TextInput source="erp_did" />
      <TextInput source="name" />
      <TextInput source="brand" />
      <TextInput source="unit" />
      <NumberInput source="price.priceGross" label="Price" />
      <TextInput source="substitutes" />
      <TextInput source="categories.subCategories" />
      <TextInput source="description" />
      <NumberInput source="countInStock" />
      <FileInput source="images" />
    </SimpleForm>
  </Edit>
);
