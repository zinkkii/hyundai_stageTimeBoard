"use client";

import { Typography, Stack, Divider, Container } from "@mui/material";
import { signOut } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import Chart from "./Chart";

export default function DashBoard() {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
        <a href="/">
          <b>DashBoard</b>
        </a>
        <LoadingButton
          color="error"
          size="large"
          type="submit"
          sx={{ border: "1px solid" }}
          onClick={() => signOut()}
        >
          <b>LOGOUT</b>
        </LoadingButton>
      </Typography>
      <Chart />
    </Container>
  );
}
