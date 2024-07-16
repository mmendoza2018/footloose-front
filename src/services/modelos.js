import baseApi from "./baseApi";
import objErrorApi from "./objError";
const stepApi = 'models';

const getModels = () => {
  return baseApi(stepApi)
    .get("/")
    .catch(objErrorApi);
};

export {
  getModels
};
