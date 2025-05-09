import api from "./api";

export const signup = async (email: string, password: string) => {
  const response = await api.post("/auth/signup", { email, password });
  sessionStorage.setItem("accessToken", response.data.accessToken);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });

  sessionStorage.setItem("accessToken", response.data.accessToken);
  return response.data;
};

export const logout = async () => {
  await api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }
  );

  sessionStorage.removeItem("accessToken");
};
