import Link from "next/link";

import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { DeleteTodoMutation } from "@/API";
import { deleteTodo } from "@/graphql/mutations";

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

const Todo = ({ todo }) => {
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
  return (
    <Grid item md={6}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Link href={`/todos/${todo.id}`}>{todo.name}</Link>
          </Typography>
          <Typography color="textSecondary">
            created at {new Date(todo.timestamp * 1000).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <FormControlLabel
            control={<Checkbox color="primary" />}
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
