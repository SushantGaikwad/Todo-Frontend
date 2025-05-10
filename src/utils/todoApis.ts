import api from "./api";

export const getTodos = async () => {
  const response = await api.get("/todos", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createTodo = async (todo: {
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}) => {
  const response = await api.post("/todos", todo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateTodo = async (
  id: string,
  todo: {
    title: string;
    description: string;
    dueDate: string;
    status: "pending" | "completed";
  }
) => {
  const response = await api.put(`/todos/${id}`, todo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteTodo = async (id: string) => {
  await api.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": import.meta.env.VITE_API_URL,
      "Content-Type": "application/json",
    },
  });
};
