
const getEnvVariables = () => {

  const variablesEnv = import.meta.env;
  return {
    ...variablesEnv
  }

}
export default getEnvVariables;