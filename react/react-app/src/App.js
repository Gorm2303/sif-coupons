import React from 'react';
import { Container, Typography } from '@mui/material';
import MainComponent from './components/CardComponent';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Unified Tree, Card, and Token App
      </Typography>

      {/* Unified Main Component */}
      <MainComponent />
    </Container>
  );
}

export default App;
