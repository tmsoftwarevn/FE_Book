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
export const callGetListBookHome = (
  current,
  pageSize,
  category,
  sort,
  price,
  rate
) => {
  return axios.get(
    `/api/v1/home/book?current=${current}&pageSize=${pageSize}&category=${category}${sort}&price=${price}&rate=${rate}`
  );
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
  idCategory,
  description,
  hinhthuc,
  nhaxuatban,
  ngayxuatban
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
    description,
    hinhthuc,
    nhaxuatban,
    ngayxuatban,
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
  idCategory,
  description,
  hinhthuc,
  ngayxuatban,
  nhaxuatban
) => {
  return axios.put(`/api/v1/book/${id_book}`, {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    quantity,
    idCategory,
    description,
    hinhthuc,
    ngayxuatban,
    nhaxuatban,
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

export const callUpdateUser = (id, name) => {
  return axios.put(`/api/v1/user/${id}`, { fullname: name });
};

export const callUpdatePassword = (email, pass, newPass) => {
  return axios.put("/api/v1/user", {
    email: email,
    password: pass,
    newPassword: newPass,
  });
};

export const callSendOTP = (email) => {
  return axios.post("/api/v1/forgot-password", { email });
};

export const callVerify = (email, OTP) => {
  return axios.post("/api/v1/checkOTP", { email, OTP });
};

export const callNewPassword = (email, newPassword) => {
  return axios.post("/api/v1/newPass", { email, newPassword });
};

export const callGetOrderHistoryWithStatus = (
  idUser,
  idStatus,
  current,
  pageSize
) => {
  return axios.get(
    `/api/v1/user/orderStatus/${idUser}?current=${current}&pageSize=${pageSize}&idStatus=${idStatus}`
  );
};

export const callListBookPopularAll = () => {
  return axios.get("/api/v1/book/popular/all");
};

export const callSearchBook = (mainText, current, pageSize) => {
  return axios.get(
    `/api/v1/search?mainText=${mainText}&current=${current}&pageSize=${pageSize}`
  );
};

// category
export const callCreate_Category = (category) => {
  return axios.post(`/api/v1/category/create`, { category });
};

export const callUpdate_Category = (id, category) => {
  return axios.put(`/api/v1/category/${id}`, { category });
};

export const callDelete_Category = (id) => {
  return axios.delete(`/api/v1/category/${id}`);
};
