'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button, Card, CardContent, Typography } from '@mui/material';

function Auth() {
  const [tab, setTab] = useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: '100px auto',
      }}
    >
      <Card>
        <CardContent>
          <Tabs value={tab} onChange={handleChange} variant="fullWidth" centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {tab === 0 && (
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Email" type="email" fullWidth />
              <TextField label="Password" type="password" fullWidth />
              <Button variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Name" fullWidth />
              <TextField label="Email" type="email" fullWidth />
              <TextField label="Password" type="password" fullWidth />
              <TextField label="Confirm Password" type="password" fullWidth />
              <Button variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Auth;