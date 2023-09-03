"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Grid } from "@mui/material";
import { Amplify } from "aws-amplify";
import awsconfig from "@/aws-exports";
import { API, graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { CreateTodoMutation } from "@/API";
import { createTodo } from "@/graphql/mutations";

import Form from "@/components/Form";

Amplify.configure(awsconfig);

const TodoNewPage = () => {
  const router = useRouter();

  const onSubmit = async (name: string) => {
    try {
      const result = (await API.graphql(
        graphqlOperation(createTodo, {
          input: {
            name,
            completed: false,
          },
        })
      )) as GraphQLResult<CreateTodoMutation>;
      router.push("/");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href="/">
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>
      </Grid>
      <Form onSubmit={onSubmit} />
    </>
  );
};

export default withAuthenticator(TodoNewPage);
