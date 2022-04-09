import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import dataProvider from "./apiProvider";
import { ProductList } from "./components/ProductList";
import { ProductEdit } from "./components/ProductEdit";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" list={ProductList} edit={ProductEdit} />
  </Admin>
);

export default App;
