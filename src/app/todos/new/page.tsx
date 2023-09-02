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

const TodosNew = () => {
  const router = useRouter();

  //   const onSubmit = async (newTodo: any) => {
  //     (await API.graphql(
  //       graphqlOperation(createTodo, {
  //         input: {
  //           ...newTodo,
  //           completed: false,
  //           //   timestamp: Math.floor(Date.now() / 1000),
  //         },
  //       })
  //     )) as GraphQLResult<CreateTodoMutation>;
  //     router.push("/");
  //   };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item md={6}>
          <h1>Todos</h1>
        </Grid>
        <Grid item md={6}>
          <Link href="/">
            <Button component="a" variant="contained">
              Back
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/* <Form onSubmit={onSubmit} /> */}
    </>
  );
};

export default withAuthenticator(TodosNew);
