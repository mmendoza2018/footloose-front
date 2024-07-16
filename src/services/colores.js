import baseApi from "./baseApi";
import objErrorApi from "./objError";
const stepApi = 'colors';

const getColors = () => {
  return baseApi(stepApi)
    .get("/")
    .catch(objErrorApi);
};

export {
  getColors
};
