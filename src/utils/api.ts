import axios from "axios";

function getCookie(cname: any) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);

  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

console.log(">>> accessToken :", getCookie("accessToken"));

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default api;
