import baseApi from "./baseApi";
import objErrorApi from "./objError";
const stepApi = 'sizes';

const getSizes = () => {
  return baseApi(stepApi)
    .get("/")
    .catch(objErrorApi);
};

export {
  getSizes
};
