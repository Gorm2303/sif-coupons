import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { Box, Typography } from '@mui/material';
import './CardSwipeComponent.css';

const CardSwipeComponent = ({ onSwipe }) => {
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      onSwipe();
    },
    trackMouse: true, // Allows swipe detection with mouse for testing purposes
  });

  return (
    <Box {...handlers} className="swipe-card">
      <Typography variant="h6" align="center">
        Swipe to Use Card
      </Typography>
    </Box>
  );
};

export default CardSwipeComponent;
