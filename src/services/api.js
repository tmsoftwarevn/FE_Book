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

export const callGetListBook = (
  current,
  pageSize
  // name,
  // author,
  // category,
  // sort
) => {
  return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}`);
};
export const callFetchCategory = () => {
  return axios.get("/api/v1/database/category");
};

export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/file/upload",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

export const callCreateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callUpdateBook = (
  id_book,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put(`/api/v1/book/${id_book}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};
