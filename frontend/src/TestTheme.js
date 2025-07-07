import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function TestTheme() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px' }}>
        <h1>Theme Test</h1>
        <Button variant="contained" color="primary">
          Test Button
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default TestTheme;
