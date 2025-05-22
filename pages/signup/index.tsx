"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const Backend_URL = "http://localhost:5000";

  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    const res = await fetch(Backend_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert(res.statusText);
      return;
    }

    const response = await res.json();
    alert("User Registered!");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Sign up
        </Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Name"
            variant="outlined"
            required
            fullWidth
            onChange={(e) => (data.current.name = e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            type="email"
            onChange={(e) => (data.current.email = e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            required
            fullWidth
            type="password"
            onChange={(e) => (data.current.password = e.target.value)}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button variant="contained" color="primary" onClick={register}>
              Submit
            </Button>
            <Link href="/" passHref>
              <Button variant="text">Cancel</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignupPage;
