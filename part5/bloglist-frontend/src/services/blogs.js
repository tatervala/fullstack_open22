import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (object) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, object, config);
  return response.data;
};

const update = async (object) => {
  const request = axios.put(`${baseUrl}/${object.id}`, object);
  const response = await request;
  return response.data;
};
const remove = async (object) => {
  const request = axios.delete(`${baseUrl}/${object.id}`, object);
  const response = await request;
  return response.data;
};

export default { getAll, create, update, setToken, remove };
