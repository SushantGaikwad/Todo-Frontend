import api from "./api";

export const signup = async (email: string, password: string) => {
  const response = await api.post("/auth/signup", { email, password });
  localStorage.setItem("accessToken", response.data.accessToken);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });

  localStorage.setItem("accessToken", response.data.accessToken);
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
  localStorage.removeItem("accessToken");
};
