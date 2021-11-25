import axios from "axios";
export const SERVER_URL = process.env.SERVER_URL;

axios.defaults.withCredentials = true;

export const postDataAPI = async (
  url: string,
  data: object,
  token?: string
) => {
  const res = await axios.post(`${SERVER_URL}/${url}`, data, {
    headers: { Authorization: `${token}` },
  });

  return res;
};

export const getDataAPI = async (url: string, token?: string) => {
  const res = await axios.get(`${SERVER_URL}/${url}`, {
    headers: { Authorization: `${token}` },
  });

  return res;
};

export const patchDataAPI = async (
  url: string,
  data: object,
  token?: string
) => {
  const res = await axios.patch(`${SERVER_URL}/${url}`, data, {
    headers: { Authorization: `${token}` },
  });

  return res;
};

export const putDataAPI = async (url: string, data: object, token?: string) => {
  const res = await axios.put(`${SERVER_URL}/${url}`, data, {
    headers: { Authorization: `${token}` },
  });

  return res;
};

export const deleteDataAPI = async (url: string, token?: string) => {
  const res = await axios.delete(`${SERVER_URL}/${url}`, {
    headers: { Authorization: `${token}` },
  });

  return res;
};

export const fetcher = (url: string) => getDataAPI(url).then((res) => res.data);
