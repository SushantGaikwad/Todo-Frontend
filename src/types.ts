export interface Todo {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
}
