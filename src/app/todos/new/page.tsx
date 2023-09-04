"use client";

import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
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
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Todoの新規登録
      </Typography>
      <Grid sx={{ marginTop: 1 }}>
        <Form onSubmit={onSubmit} />
      </Grid>
    </>
  );
};

export default withAuthenticator(TodoNewPage);
