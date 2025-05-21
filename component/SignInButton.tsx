"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button, Typography, Box } from "@mui/material";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log({ session });

  if (session && session.user)
    return (
      <Box display="flex" alignItems="center" gap={2} ml="auto">
        <Typography color="white">{session.user.name}</Typography>
        <Button
          component={Link}
          href="/api/auth/signout"
          variant="outlined"
          color="error"
        >
          Sign Out
        </Button>
      </Box>
    );

  return (
    <Box display="flex" alignItems="center" gap={2} ml="auto">
      <Button
        component={Link}
        href="/api/auth/signin"
        variant="outlined"
        color="success"
      >
        Sign In
      </Button>
      <Button
        component={Link}
        href="/signup"
        variant="contained"
        color="success"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignInButton;
