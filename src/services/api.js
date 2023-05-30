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
