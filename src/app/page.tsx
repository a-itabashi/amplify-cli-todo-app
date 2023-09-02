"use client";
import React from "react";
import { useEffect } from "react";

import Link from "next/link";

import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "@/aws-exports";
import { GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Container, Button, Grid } from "@mui/material";
import { ListTodosQuery } from "@/API";

import { useRecoilState } from "recoil";
import { todosState } from "@/store/todos";
import { listTodos } from "@/graphql/queries";
import { Todo } from "@/components/todo";

Amplify.configure(awsconfig);

const TodosIndex = () => {
  const [todos, setTodos] = useRecoilState(todosState);

  useEffect(() => {
    const asyncFunc = async () => {
      const result = (await API.graphql(
        graphqlOperation(listTodos)
      )) as GraphQLResult<ListTodosQuery>;

      setTodos(result?.data?.listTodos?.items || []);
    };
    asyncFunc();
  }, [setTodos]);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href="/todos/new">
            <Button variant="contained" color="primary">
              New
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2}>
        {todos.map((todo) =>
          todo ? <Todo key={todo.id} todo={todo} /> : null
        )}
      </Grid>
    </>
  );
};

export default withAuthenticator(TodosIndex);
