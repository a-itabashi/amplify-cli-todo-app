import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { FC } from "react";

type Inputs = {
  name: string;
};

type FormProps = {
  onSubmit: (name: string) => void;
};

const Form: FC<FormProps> = (props) => {
  // const { control, handleSubmit } = useForm<Inputs>({
  //   defaultValues: { name: "デフォルトのtodo" },
  // });
  const { control, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    props.onSubmit(data.name);
  };

  const validationRules = {
    name: {
      required: "タイトルを入力してください。",
      maxLength: { value: 30, message: "30文字以内で入力をしてください。" },
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2}>
        <Grid item md={6}>
          <Controller
            name="name"
            control={control}
            rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="TODOのタイトル"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item md={6}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
