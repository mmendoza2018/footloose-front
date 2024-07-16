import axios from "axios";
import getEnvVariables from "../config/getEnvVariables";

const baseApi = ( stepApi ) => {
  const { VITE_API_URL } = getEnvVariables();

  const baseApi = axios.create({
    baseURL: `${VITE_API_URL}/${ stepApi }`,
  });

  baseApi.interceptors.request.use((config) => {
    const { token } = JSON.parse(localStorage.getItem("userFootloose") || '{}');
    config.headers["x-token"] = `${token}`;
    return config;
  });
  return baseApi;
};

export default baseApi;
