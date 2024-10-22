import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Box } from '@mui/material';

function TreeData() {
  const [treeInfo, setTreeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.example.com/tree')
      .then(response => {
        setTreeInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tree data", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <h2>Tree Information</h2>
      <Box>
        <p>{treeInfo.name}</p>
        <p>{treeInfo.description}</p>
      </Box>
    </Container>
  );
}

export default TreeData;
