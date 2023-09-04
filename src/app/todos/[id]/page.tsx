"use client";
import { useParams, useRouter } from "next/navigation";
import { Typography, Grid } from "@mui/material";
import { Amplify } from "aws-amplify";
import awsconfig from "@/aws-exports";
import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { GetTodoQuery, UpdateTodoMutation } from "@/API";
import { updateTodo } from "@/graphql/mutations";
import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { getTodo } from "@/graphql/queries";

Amplify.configure(awsconfig);

const TodoEditPage = () => {
  const [todoName, setTodoName] = useState<string | null>(null);
  const id = useParams().id;
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchTodoDetails(id as string);
    }
  }, [id]);

  const fetchTodoDetails = async (todoId: string) => {
    try {
      const result = (await API.graphql(
        graphqlOperation(getTodo, { id: todoId })
      )) as GraphQLResult<GetTodoQuery>;
      if (result.data && result.data.getTodo) {
        setTodoName(result.data.getTodo.name);
      }
    } catch (error) {
      console.error("Error fetching todo details:", error);
    }
  };

  const onSubmit = async (updatedName: string) => {
    try {
      const result = (await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id,
            name: updatedName,
          },
        })
      )) as GraphQLResult<UpdateTodoMutation>;
      router.push("/");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (todoName === null) return null;

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Todoの編集
      </Typography>
      <Grid sx={{ marginTop: 1 }}>
        <Form onSubmit={onSubmit} name={todoName} />
      </Grid>
    </>
  );
};

export default withAuthenticator(TodoEditPage);
