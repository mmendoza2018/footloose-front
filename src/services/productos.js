import baseApi from "./baseApi";
import objErrorApi from "./objError";
const stepApi = 'products';

const postProductos = (data) => {
  return baseApi(stepApi)
    .post("/", data)
    .catch();
};

const putProductos = (id, data) => {
  return baseApi(stepApi)
    .put(`/${id}`, data)
    .catch(objErrorApi);
};

const getProductos = () => {
  return baseApi(stepApi)
    .get("/")
    .catch(objErrorApi);
};

const getProducto = (id) => {
  return baseApi(stepApi)
    .get(`/${id}`)
    .catch(objErrorApi);
};

const postImportacion = (data) => {
  return baseApi(stepApi)
    .post(`/masivo`, data)
    .catch(objErrorApi);
};


export {
  postProductos,
  putProductos,
  getProductos,
  getProducto,
  postImportacion
};
