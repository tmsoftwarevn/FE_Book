import axios from "axios";
import axiosRetry from "axios-retry";
import NProgress from "nprogress";

const baseURL = import.meta.env.VITE_BACKEND_URL;

// NProgress.configure({
//   showSpinner: false,
//   easing: "ease",
//   speed: 1000,
// });

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosRetry(instance, {
  retries: 2,
  retryCondition: (error) => {
    return error.response.status === 401;
  },
  retryDelay: (retryCount, error) => {
    return retryCount * 100;
  },
});

const handleRefreshToken = async () => {
  const res = await instance.get("/api/v1/auth/refresh");
  if (res && res.data) {
    return res.data.access_token;
  } else return null;
};

instance.interceptors.request.use(
  function (config) {
    // config khi login ban dau, khoi tao lai header, save outside not auto save
    const user = localStorage.getItem("access_token");
    if (user) {
      config.headers.Authorization = `Bearer ${user}`;
    }
    // NProgress.start();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const NO_RETRY_HEADER = "x-no-retry";

instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // NProgress.done();
    if (
      error.config &&
      error.response &&
      +error.response.status === 401
      // !error.config.headers[NO_RETRY_HEADER] // chay 1 lan , no retry
    ) {
      const access_token = await handleRefreshToken();
      //error.config.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return instance.request(error.config);
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/api/v1/auth/refresh"
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);
export default instance;
