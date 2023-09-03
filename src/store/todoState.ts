import { atom } from "recoil";
type Todo = {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
} | null;

const todosState = atom<Todo[]>({
  key: "todos",
  default: [],
});

export { todosState };
