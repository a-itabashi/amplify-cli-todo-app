import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { TextField, Button, Grid } from "@mui/material";

const Form = (props: any) => {
  //   const { onSubmit, values } = props;
  //   const { register, handleSubmit, errors, reset, setValue } = useForm();

  //   useEffect(() => {
  //     if (!values) return;
  //     setValue("name", values.name);
  //   });

  //   const handler = (newTodo) => {
  //     onSubmit(newTodo);
  //     reset();
  //   };

  const errorMessage = (errors: any, field: any) => {
    // const message = [];
    // // if (errors[field]?.type == "required") {
    // //   message.push("required");
    // // }
    // // if (errors[field]?.type == "maxLength") {
    // //   message.push("Exceeded 20 characters");
    // // }
    // return message.join(", ");
  };

  return (
    // <form onSubmit={handleSubmit(handler)}>
    //   <Grid container direction="column" spacing={2}>
    //     <Grid item md={6}>
    //       <TextField
    //         label="Name"
    //         name="name"
    //         fullWidth
    //         // inputRef={register({ required: true, maxLength: 20 })}
    //         // error={Boolean(errors.name)}
    //         helperText={errorMessage(errors, "name")}
    //       />
    //     </Grid>
    //     <Grid item md={6}>
    //       <Button type="submit" variant="contained" color="primary">
    //         Save
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </form>
    <></>
  );
};

export default Form;
