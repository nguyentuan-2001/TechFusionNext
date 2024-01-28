import axios from "axios";
// import _ from "lodash";

const mainRequestConfig = {
  // Mock baseURL is from a local Postman Mock Server
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
};

const mainAxiosInstance = axios.create(mainRequestConfig);

mainAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

const mainRequest = (
  url,
  payload,
  method,
  headers = { "X-Requested-With": "XMLHttpRequest" }
) => {
  const data = payload;
  let params;
  if (method === "get") {
    params = payload;
  }
  return mainAxiosInstance(url, { data, params, method, headers });
};

const SERVICES = {
  /* <CUSTOMERS> */
  loginCustomer: (payload) => mainRequest(`/customer/login/`, payload, "post"),

  /* <PRODUCTS> */
  getProducts: (payload) => mainRequest(`/products/`, payload, "get"),

  /* <CARTS> */
  buyProduct: (payload) => mainRequest(`/carts/`, payload, "post"),
  getCarts: (payload) => mainRequest(`/cart/${payload.id}/`, null, "get"),
  deleteProductCart: (payload) =>
    mainRequest(
      `/cart/customer/${payload.IDCustomer}/product/${payload.IDProduct}/`,
      payload,
      "delete"
    ),
};

export default SERVICES;
