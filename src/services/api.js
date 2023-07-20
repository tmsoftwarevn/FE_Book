import axios from "../utils/axios-customized";

export const RegisterUser = (fullName, email, password) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
  });
};

export const ApiLogin = (email, password) => {
  return axios.post("/api/v1/auth/login", {
    email,
    password,
  });
};

export const callGetAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export const callLogout = (idUser) => {
  return axios.post("/api/v1/auth/logout", { id: idUser });
};

export const callGetListUser = (current, pageSize, sort, search) => {
  return axios.get(
    `/api/v1/user?current=${current}&pageSize=${pageSize}${sort}${search}`
  );
};

export const callDeleteUser = (id) => {
  return axios.delete(`/api/v1/user/${id}`);
};

export const callGetListBookAdmin = (current, pageSize, sort, d) => {
  return axios.get(
    `/api/v1/book?current=${current}&pageSize=${pageSize}${sort}${d}`
  );
};
export const callGetListBookHome = (current, pageSize) => {
  return axios.get(`/api/v1/home/book?current=${current}&pageSize=${pageSize}`);
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
  rate,
  idCategory
) => {
  return axios.post("/api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    rate,
    idCategory,
  });
};

export const callUpdateBook = (
  id_book,
  thumbnail,
  slider,
  mainText,
  author,
  price,
  quantity,
  idCategory
) => {
  return axios.put(`/api/v1/book/${id_book}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    quantity,
    idCategory,
  });
};

export const callDeleteBook = (id) => {
  return axios.delete(`/api/v1/book/delete/${id}`);
};

export const callGetDetailBook = (id) => {
  return axios.get(`/api/v1/book/${id}`);
};

export const callGetSocial = () => {
  return axios.get("/api/v1/login/success");
};

export const callCreateDelivery = (delivery) => {
  return axios.post("/api/v1/delivery", delivery);
};

export const callGetInfoDelivery = (id) => {
  return axios.get(`/api/v1/delivery/${id}`);
};

export const callUpdateInfoDelivery = (id, up) => {
  return axios.put(`/api/v1/delivery/${id}`, up);
};

export const callCreateOrder = (order) => {
  return axios.post("/api/v1/order", order);
};
export const callGetOrderAdmin = (current, pageSize, search) => {
  return axios.get(
    `/api/v1/order?current=${current}&pageSize=${pageSize}&search=${search}`
  );
};
export const callUpdateBookAfterOrder = (id, count) => {
  return axios.put("/api/v1/updateBook", { id, count });
};

export const callOrderHistoryUser = (id, current, pageSize) => {
  return axios.get(
    `/api/v1/user/orderHistory/${id}?current=${current}&pageSize=${pageSize}`
  );
};

export const callCreateOrderDetail = (detail) => {
  return axios.post("/api/v1/orderDetail", detail);
};

export const callGetDetailOrderWithId = (id) => {
  return axios.get(`/api/v1/orderDetail/${id}`);
};

export const callGetStatus = () => {
  return axios.get(`/api/v1/status`);
};

export const callUpdateOrderStatus = (idOrder, id) => {
  return axios.put(`/api/v1/orderStatus/${idOrder}`, { idStatus: id });
};
