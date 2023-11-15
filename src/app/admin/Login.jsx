"use client";
import { LoadingButton } from "@mui/lab";
import { Typography, Stack, Divider, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const login = async (data) => {
    await signIn("credentials", {
      id: data.id,
      pw: data.pw,
      callbackUrl: "/admin",
    });
  };

  return (
    <>
      <Stack
        spacing={4}
        sx={{
          p: 4,
          width: 1,
          mx: "auto",
          flexShrink: 0,
          maxWidth: 300,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "5px 10px #888888",
          border: "1px solid",
        }}
      >
        <Typography variant="h6" paragraph>
          Admin Login
        </Typography>
        <Divider>AMX</Divider>
        <form
          onSubmit={handleSubmit((data) => {
            login(data);
            setData(JSON.stringify(data));
          })}
        >
          <TextField
            fullWidth
            sx={{ marginBottom: 1 }}
            {...register("id", { required: true })}
            placeholder="ID"
          />
          <TextField
            fullWidth
            sx={{ marginBottom: 1 }}
            {...register("pw", { required: true })}
            type="password"
            placeholder="PW"
          />
          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            type="submit"
            sx={{ border: "1px solid" }}
          >
            Login
          </LoadingButton>
        </form>
      </Stack>
    </>
  );
}
