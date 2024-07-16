import baseApi from "./baseApi";
import objErrorApi from "./objError";
const stepApi = 'brands';

const getBrands = () => {
  return baseApi(stepApi)
    .get("/")
    .catch(objErrorApi);
};

export {
  getBrands
};
