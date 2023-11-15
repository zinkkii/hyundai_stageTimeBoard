"use client";
import {
  Container,
  Box,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { display } from "@mui/system";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import imgsrc from "/public/img/logo2x.png";
import imgsrc2 from "/public/img/logo.png";

export default function Main() {
  const [ranking, setRanking] = useState([
    {
      name: "",
      email: "",
      laptime1: 0,
      laptime2: 0,
      laptime3: 0,
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
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 3, marginBottom: 3 }}>
        <Box sx={{ bgcolor: "#fff" }}>
          <Stack
            spacing={{ xs: 1.5, sm: 3 }}
            sx={{ padding: { xs: 1.5, sm: 3, md: 5 }, overflow: "hidden" }}
          >
            <Typography
              sx={{
                color: "#222",
                fontSize: { xs: "3.5rem", sm: "7rem", md: "12rem" },
                fontFamily: "Hbold",
                letterSpacing: { xs: "-1.5px", sm: "-2.3px", md: "-3.3px" },
                lineHeight: { xs: "50px", sm: "90px", md: "160px" },
              }}
            >
              Stage Time
              <br />
              Board
            </Typography>
            <Typography
              sx={{
                color: "#222",
                fontSize: { xs: "1.5rem", sm: "2.3rem", md: "5rem" },
                fontFamily: "Hmedium",
                letterSpacing: "1px",
              }}
            >
              in WRC Rally Japan
            </Typography>
            <Image src={imgsrc} alt="hyundai N logo" width={100} />
            <div>
              <TableContainer
                sx={{
                  maxHeight: "50vh",
                  marginLeft: -2,
                }}
              >
                <Table
                  sx={{ minWidth: 100 }}
                  stickyHeader
                  size="small"
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "Hbold",
                          fontSize: { xs: "0.9rem", sm: "1.2rem", md: "2rem" },
                          borderBottom: "none",
                        }}
                      >
                        Rank
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Hbold",
                          fontSize: { xs: "0.9rem", sm: "1.2rem", md: "2rem" },
                          borderBottom: "none",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Hbold",
                          fontSize: { xs: "0.9rem", sm: "1.2rem", md: "2rem" },
                          borderBottom: "none",
                        }}
                      >
                        e-mail
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Hbold",
                          fontSize: { xs: "0.9rem", sm: "1.2rem", md: "2rem" },
                          borderBottom: "none",
                        }}
                      >
                        Laptime
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ranking.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            fontFamily: "Hregular",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "1rem",
                              md: "1.5rem",
                            },
                            borderBottom: "none",
                          }}
                        >
                          {String(index + 1).padStart(4, "0")}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Hregular",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "1rem",
                              md: "1.5rem",
                            },
                            borderBottom: "none",
                          }}
                        >
                          {row.name
                            .substring(0, row.name.length - 2)
                            .concat("**")}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Hregular",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "1rem",
                              md: "1.5rem",
                            },
                            borderBottom: "none",
                          }}
                        >
                          {row.email
                            .substring(0, row.email.indexOf("@") - 2)
                            .concat(
                              "**",
                              row.email.substring(row.email.indexOf("@"))
                            )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Hregular",
                            fontSize: {
                              xs: "0.7rem",
                              sm: "1rem",
                              md: "1.5rem",
                            },
                            borderBottom: "none",
                          }}
                        >
                          {String(row.laptime1).padStart(3, "0")}:
                          {String(row.laptime2).padStart(2, "0")}.
                          {String(row.laptime3).padStart(3, "0")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: { xs: 1.5, sm: 7 },
            marginBottom: 2,
          }}
        >
          <Image src={imgsrc2} alt="hyundai logo" width={200} />
        </Box>
      </Container>
    </>
  );
}
