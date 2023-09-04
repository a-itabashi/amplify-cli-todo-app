import Link from "next/link";

import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { DeleteTodoMutation, UpdateTodoMutation } from "@/API";
import { deleteTodo, updateTodo } from "@/graphql/mutations";

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
import { todosState } from "@/store/todoState";
import { FC } from "react";

type TodoType = {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
} | null;

type TodoProps = {
  todo: TodoType;
};

const Todo: FC<TodoProps> = ({ todo }) => {
  const [todos, setTodos] = useRecoilState(todosState);

  const onArchive = async () => {
    if (!todo) return;

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
    if (!todo) return;

    const isChecked = e.target.checked;

    try {
      const result = (await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: todo.id,
            completed: isChecked,
          },
        })
      )) as GraphQLResult<UpdateTodoMutation>;
      const updatedTodo = result?.data?.updateTodo;
      setTodos(
        todos.map((item) =>
          item && item.id === todo.id && updatedTodo ? updatedTodo : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (!todo) {
    return null;
  }

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
