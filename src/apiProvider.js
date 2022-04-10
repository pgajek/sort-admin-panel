import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:9000/api/v1";
const httpClient = fetchUtils.fetchJson;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: (resource, params) => {
    const query = ""; // TO DO Later
    const url = `${apiUrl}/${resource}?${query}`;

    return httpClient(url)
      .then(({ headers, json }) => {
        const items = json[resource].map((item) => {
          item.id = item._id;
          return item;
        });
        return {
          data: items,
          total: json.total && json.total,
        };
      })
      .catch((err) => {
        console.log("getList error");
        return Promise.reject(err);
      });
  },
  getOne: (resource, params) => {
    httpClient(`${apiUrl}/${resource}/${params.id}`)
      .then(({ json }) => {
        json.id = params.id;
        return {
          data: json,
        };
      })
      .catch((err) => {
        console.log("getOne error");
        return Promise.reject(err);
      });
  },
  update: (resource, params) => {
    const product = params.data;
    product._id = product.id;
    // product.id.delete();
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
      .then(({ json }) => ({ data: json }))
      .catch((err) => {
        console.log("update error");
        return Promise.reject(err);
      });
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
