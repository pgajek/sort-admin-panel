import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:9000/api/v1";
const httpClient = fetchUtils.fetchJson;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: async (resource, params) => {
    const query = ""; // TO DO Later
    const url = `${apiUrl}/${resource}?${query}`;
    try {
      const { json } = await httpClient(url);

      const items = json[resource].map((item) => {
        item.id = item._id;
        return item;
      });

      return {
        data: items,
        total: json.total && json.total,
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  getOne: async (resource, params) => {
    try {
      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
      json.id = params.id;
      console.log(json);
      return {
        data: json,
      };
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },
  // getOne: (resource, params) => {
  //   httpClient(`${apiUrl}/${resource}/${params.id}`)
  //     .then(({ json }) => {
  //       json.id = params.id;
  //       console.log(json);
  //       return {
  //         data: json,
  //       };
  //     })
  //     .catch((err) => {
  //       console.log("getOne error");
  //       return Promise.reject(err);
  //     });
  // },
  update: async (resource, params) => {
    try {
      const product = params.data;
      product._id = product.id;

      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });
      json.data.id = json.data._id;
      console.log(json);
      return {
        data: json,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getMany: (resource, params) => {
    return Promise.rejest();
  },
  getManyReference: (resource, params) => {
    return Promise.reject();
  },
  updateMany: (resource, params) => {
    return Promise.reject();
  },
  create: (resource, params) => Promise.reject(),

  delete: (resource, params) => Promise.reject(),

  deleteMany: (resource, params) => {
    return Promise.reject();
  },
};
