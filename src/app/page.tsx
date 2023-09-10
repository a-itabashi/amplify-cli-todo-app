"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import awsconfig from "@/aws-exports";
import { GraphQLResult } from "@aws-amplify/api";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Button, Grid } from "@mui/material";
import { ListTodosQuery } from "@/API";
import useSWR from "swr";
import { todosState } from "@/store/todoState";
import { listTodos } from "@/graphql/queries";
import { Todo } from "@/components/todo";
import { useRecoilState } from "recoil";

Amplify.configure(awsconfig);

const fetcher = async () => {
  const result = (await API.graphql(
    graphqlOperation(listTodos)
  )) as GraphQLResult<ListTodosQuery>;

  return result?.data?.listTodos?.items || [];
};

const TodosIndex = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const { data: fetchedTodos } = useSWR("todosList", fetcher);

  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos, setTodos]);

  // if (error) {
  //   return <div>Error fetching todos</div>;
  // }

  // if (todos.length === 0) {
  //   console.log("testtest");
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Grid container direction="column" spacing={2} sx={{ marginTop: 1 }}>
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
      <Grid container direction="column" spacing={2} sx={{ marginTop: 1 }}>
        {todos.map((todo) =>
          todo ? <Todo key={todo.id} todo={todo} /> : null
        )}
      </Grid>
    </>
  );
};

export default withAuthenticator(TodosIndex);

// "use client";
// import React from "react";
// import { useEffect } from "react";
// import Link from "next/link";
// import { Amplify, API, graphqlOperation } from "aws-amplify";
// import awsconfig from "@/aws-exports";
// import { GraphQLResult } from "@aws-amplify/api";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import { Button, Grid } from "@mui/material";
// import { ListTodosQuery } from "@/API";
// import { useRecoilState } from "recoil";
// import { todosState } from "@/store/todoState";
// import { listTodos } from "@/graphql/queries";
// import { Todo } from "@/components/todo";

// Amplify.configure(awsconfig);

// const TodosIndex = () => {
//   const [todos, setTodos] = useRecoilState(todosState);

//   useEffect(() => {
//     const asyncFunc = async () => {
//       const result = (await API.graphql(
//         graphqlOperation(listTodos)
//       )) as GraphQLResult<ListTodosQuery>;

//       setTodos(result?.data?.listTodos?.items || []);
//     };
//     asyncFunc();
//   }, [setTodos]);

//   return (
//     <>
//       <Grid container direction="column" spacing={2} sx={{ marginTop: 1 }}>
//         <Grid item md={6}>
//           <h1>Todos</h1>
//         </Grid>
//         <Grid item md={6}>
//           <Link href="/todos/new">
//             <Button variant="contained" color="primary">
//               New
//             </Button>
//           </Link>
//         </Grid>
//       </Grid>
//       <Grid container direction="column" spacing={2} sx={{ marginTop: 1 }}>
//         {todos.map((todo) =>
//           todo ? <Todo key={todo.id} todo={todo} /> : null
//         )}
//       </Grid>
//     </>
//   );
// };

// export default withAuthenticator(TodosIndex);
