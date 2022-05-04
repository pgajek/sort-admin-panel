import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:9000/api/v1";
const httpClient = fetchUtils.fetchJson;

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
  });
const addUploadCapabilities = (requestHandler) => (type, resource, params) => {
  if (resource === "products") {
    if (params.data.pictures && params.data.pictures.length) {
      // only freshly dropped pictures are instance of File
      const formerPictures = params.data.images.filter(
        (p) => !(p.rawFile instanceof File)
      );
      const newPictures = params.data.images.filter(
        (p) => p.rawFile instanceof File
      );

      return Promise.all(newPictures.map(convertFileToBase64))
        .then((base64Pictures) =>
          base64Pictures.map((picture64) => ({
            src: picture64,
            title: `${params.data.title}`,
          }))
        )
        .then((transformedNewPictures) =>
          requestHandler(type, resource, {
            ...params,
            data: {
              ...params.data,
              pictures: [...transformedNewPictures, ...formerPictures],
            },
          })
        );
    }
  }
};
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

  // getOne: async (resource, params) => {
  //   try {
  //     const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
  //     json.id = params.id;
  //     console.log(json);
  //     return {
  //       data: json,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     return Promise.reject(err);
  //   }
  // },
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
  update: async (resource, params) => {
    if (resource === "products") {
      const newImages = params.data.productImage.filter(
        (p) => p.rawFile instanceof File
      );
      const formerImages = params.data.productImage.filter(
        (p) => !(p.rawFile instanceof File)
      );
      try {
        const product = params.data;
        product._id = product.id;
        // console.log(params);
        const { json } = await httpClient(
          `${apiUrl}/${resource}/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(product),
          }
        );
        json.data.id = json.data._id;

        return Promise.all(newImages.map(convertFileToBase64))
          .then((base64Images) =>
            base64Images.map((image64) => ({
              src: image64,
            }))
          )
          .then((tranformedNewImages) => {
            const response = {
              data: {
                ...json.data,
                images: [...tranformedNewImages, ...formerImages],
              },
            };
            console.log("res: ", response);
            return response;
          });
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      try {
        const product = params.data;
        product._id = product.id;

        const { json } = await httpClient(
          `${apiUrl}/${resource}/${params.id}`,
          {
            method: "PUT",
            body: JSON.stringify(product),
          }
        );
        json.data.id = json.data._id;
        return {
          data: json,
        };
      } catch (error) {
        console.log(error);
        return error;
      }
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
