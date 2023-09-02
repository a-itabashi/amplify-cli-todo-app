import Link from "next/link";

import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { DeleteTodoMutation, UpdateTodoMutation } from "@/API";
import { deleteTodo, updateTodo } from "@/graphql/mutations";
import { listTodos } from "@/graphql/queries";

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { useRecoilState } from "recoil";
import { todosState } from "@/store/todos";
import { FC } from "react";

type Todo = {
  __typename: "Todo";
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
} | null;

const Todo: FC<any> = ({ todo }) => {
  const [todos, setTodos] = useRecoilState(todosState);

  const onArchive = async () => {
    (await API.graphql(
      graphqlOperation(deleteTodo, {
        input: {
          id: todo.id,
        },
      })
    )) as GraphQLResult<DeleteTodoMutation>;
    setTodos(todos.filter((item) => item && item.id !== todo.id));
  };

  const handleChangeDone = async (e: { target: { checked: boolean } }) => {
    const isChecked = e.target.checked; // チェックボックスの状態を取得

    try {
      // AppSync APIを通じてTodoを更新
      const result = (await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: todo.id,
            completed: isChecked, // true or false
          },
        })
      )) as GraphQLResult<UpdateTodoMutation>;
      console.log(result);
      // 更新されたTodoを取得して、ローカルのstateを更新
      const updatedTodo = result?.data?.updateTodo;
      // setTodos(todos.map((item) => (item.id === todo.id ? updatedTodo : item)));
      setTodos(
        todos
          .map((item) =>
            item ? (item.id === todo.id ? updatedTodo : item) : undefined
          )
          .filter((item): item is Todo => item !== undefined)
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Link href={`/todos/${todo.id}`}>{todo.name}</Link>
          </Typography>
          <Typography color="textSecondary">
            created at {new Date(todo.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={handleChangeDone}
                checked={todo.completed}
              />
            }
            label="Done"
          />
          <Button variant="contained" color="secondary" onClick={onArchive}>
            Archive
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export { Todo };
