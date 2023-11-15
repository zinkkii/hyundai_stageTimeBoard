"use client";

import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function RealTimeChart() {
  const [ranking, setRanking] = useState([
    {
      name: "",
      email: "",
      laptime1: 0,
      laptime2: 0,
      laptime3: 0,
      num: 0,
    },
  ]);

  let { isLoading, error, result } = useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      try {
        return await axios.post("/api/client/select").then((res) => {
          setRanking(res.data);
          return res.data;
        });
      } catch (err) {
        console.log(error);
      }
    },
    refetchInterval: 3000,
  });
  if (isLoading) return "Loading...";
  if (error) return "An Error has occurred!! + " + error.message;

  const deleteData = (num) => {
    axios
      .post("/api/admin/deleteOne", { num: num })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.lor(err));
  };

  return (
    <>
      <h2>RealTimeDataChart</h2>
      <Container>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table
            sx={{
              minWidth: 300,
            }}
            stickyHeader
            size="small"
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "Hbold",
                    borderBottom: "none",
                  }}
                >
                  Rank
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Hbold",
                    borderBottom: "none",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Hbold",
                    borderBottom: "none",
                  }}
                >
                  e-mail
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Hbold",
                    borderBottom: "none",
                  }}
                >
                  Laptime
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Hbold",
                    borderBottom: "none",
                  }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{String(index + 1).padStart(4, "0")}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {String(row.laptime1).padStart(3, "0")}:
                    {String(row.laptime2).padStart(2, "0")}.
                    {String(row.laptime3).padStart(3, "0")}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteData(row.num)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ paddingTop: 5, paddingBottom: 5 }}></Box>
      </Container>
    </>
  );
}
