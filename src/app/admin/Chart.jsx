"use client";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Divider,
  TextField,
  Box,
  Stack,
  Icon,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState, useEffect } from "react";
import axios from "axios";
import InputArea from "./InputArea";
import RealTimeChart from "./RealTimeChart";

export default function Chart() {
  const deleteInput = (index) => {};

  return (
    <>
      <InputArea />
      <RealTimeChart />
    </>
  );
}
