import api from "./api";

export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (todo: {
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}) => {
  const response = await api.post("/todos", todo);
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
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  await api.delete(`/todos/${id}`);
};
