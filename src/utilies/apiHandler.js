import axios from "axios"
const baseUrl = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: baseUrl
})

axiosApi.defaults.headers.common["Authorization"] = ""

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export async function apiGET(url, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return await axiosApi.get(url, { ...config }).then(response => response).catch(error => error.response)
}
export async function apiPOST(url, data, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response).catch((error) => error.response)
}

export async function apiPUT(url, data, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response).catch((error) => error.response)
}

export async function apiDELETE(url, config = {}) {
  let accessToken = localStorage.getItem("accessToken");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response).catch((error) => error.response)
}

export async function uploadPost(data) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const accessToken = localStorage.getItem("accessToken")
  // myHeaders.append("Authorization", "Bearer " + accessToken);
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const uploadUrl = `${baseUrl}/v1/upload-file`;
    const result = await fetch(uploadUrl, requestOptions);
    const response = await result.json();
    return response.data;
  } catch (err) {
    console.log("Error for file upload", err.message);
  }
}
