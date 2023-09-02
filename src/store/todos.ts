import { atom } from "recoil";
type Todo = {
  __typename: "Todo";
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
