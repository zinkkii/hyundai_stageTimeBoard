"use client";
import {
  Typography,
  Button,
  TextField,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function InputArea() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lap1, setLap1] = useState(0);
  const [lap2, setLap2] = useState(0);
  const [lap3, setLap3] = useState(0);
  const [arr, setArr] = useState([]);

  const addInput = (name, email, lap1, lap2, lap3) => {
    console.log(name + email + lap1 + "" + lap2);
    if (!name || !email || !lap1 || !lap2 || !lap3) {
      alert("빈칸확인");
      return;
    }

    setArr([
      ...arr,
      {
        name: name,
        email: email,
        laptime1: lap1,
        laptime2: lap2,
        laptime3: lap3,
      },
    ]);
  };

  const deleteList = (index) => {
    const copyarr = [...arr];
    copyarr.splice(index, 1);
    setArr(copyarr);
  };

  const insertData = (arr) => {
    axios
      .post("/api/admin/insert", { arr: arr })
      .then((res) => {
        setArr([]);
        alert("SUCCESS");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(arr);
  }, [arr]);

  return (
    <>
      <Divider sx={{ marginTop: 5, marginBottom: 3 }}>DATA INPUT</Divider>
      <Stack direction="row" spacing={2} sx={{ padding: 1 }}>
        <TextField
          id="driverName"
          label="Name"
          variant="filled"
          sx={{ width: "28%" }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="driverEmail"
          label="E-mail"
          variant="filled"
          sx={{ width: "28%" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="driverLaptime1"
          label="LapTime_1"
          variant="filled"
          onInput={(e) =>
            (e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1"))
          }
          onChange={(e) => setLap1(e.target.value)}
        />

        <Typography variant="h3">:</Typography>
        <TextField
          id="driverLaptime2"
          label="LapTime_2"
          variant="filled"
          onInput={(e) =>
            (e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1"))
          }
          onChange={(e) => setLap2(e.target.value)}
        />
        <Typography variant="h3">.</Typography>
        <TextField
          id="driverLaptime3"
          label="LapTime_3"
          variant="filled"
          onInput={(e) =>
            (e.target.value = e.target.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1"))
          }
          onChange={(e) => setLap3(e.target.value)}
        />
        <Button
          onClick={() => {
            addInput(name, email, lap1, lap2, lap3);
            var driverName = document.getElementById("driverName");
            var driverEmail = document.getElementById("driverEmail");
            var driverLaptime1 = document.getElementById("driverLaptime1");
            var driverLaptime2 = document.getElementById("driverLaptime2");
            var driverLaptime3 = document.getElementById("driverLaptime3");

            driverName.value = null;
            driverEmail.value = null;
            driverLaptime1.value = null;
            driverLaptime2.value = null;
            driverLaptime3.value = null;
          }}
        >
          +
        </Button>
      </Stack>
      {arr.map((row, index) => (
        <>
          <Stack key={index} direction="row" spacing={2} sx={{ padding: 1 }}>
            <Typography variant="h4">{index + 1}</Typography>
            <TextField
              label="Name"
              variant="filled"
              sx={{ width: "20%" }}
              focused
              color="success"
              size="small"
              value={row.name}
            />
            <TextField
              label="E-mail"
              variant="filled"
              sx={{ width: "20%" }}
              focused
              color="success"
              size="small"
              value={row.email}
            />
            <TextField
              label="Laptime"
              variant="filled"
              sx={{ width: "20%" }}
              focused
              color="success"
              size="small"
              value={row.laptime1 + ` : ` + row.laptime2 + `.` + row.laptime3}
            />
            <IconButton onClick={() => deleteList(index)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </>
      ))}

      {arr.length > 0 ? (
        <>
          <Box sx={{ paddingTop: 3 }}>
            <Button
              color="success"
              variant="contained"
              onClick={() => insertData(arr)}
            >
              INPUT
            </Button>
          </Box>
        </>
      ) : null}
    </>
  );
}
