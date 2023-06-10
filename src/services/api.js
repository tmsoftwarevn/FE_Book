import axios from "../utils/axios-customized";

export const RegisterUser = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};

export const ApiLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", {
    username,
    password,
  });
};

export const callGetAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
  return axios.post("/api/v1/auth/logout");
};

export const callGetAllUser = () => {
  return axios.get("/api/v1/user");
};

export const callGetListUser = (
  current,
  pageSize,
  fullName,
  email,
  phone,
  sort
) => {
  return axios.get(
    `/api/v1/user?current=${current}&pageSize=${pageSize}&fullName=${fullName}&email=${email}&phone=${phone}&sort=${sort}`
  );
};

export const callCreateUser = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user", { fullName, email, password, phone });
};
