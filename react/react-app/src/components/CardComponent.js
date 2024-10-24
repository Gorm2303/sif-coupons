import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import CardSwipeComponent from './CardSwipeComponent';
import './CardSwipeComponent.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { fetchCardData, useCard, fetchToken } from './APIService';

const leafVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const growthStages = [
  { stage: 'sapling', height: 50, leaves: 0 },
  { stage: 'small tree', height: 100, leaves: 3 },
  { stage: 'medium tree', height: 150, leaves: 5 },
  { stage: 'large tree', height: 200, leaves: 8 },
  { stage: 'fully grown', height: 250, leaves: 10 },
];

const CardComponent = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [useCount, setUseCount] = useState(0);
  const [token, setToken] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [treeData, setTreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial data
    Promise.all([fetchCardData(), fetchToken()])
      .then(([cardData, tokenData]) => {
        setUseCount(cardData.useCount);
        setGrowthStage(cardData.growthStage);
        setToken(tokenData.token);
        setCountdown(tokenData.expiresIn);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching initial data:', error);
        setError('Failed to load data.');
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Countdown logic
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      fetchToken()
        .then((data) => {
          setToken(data.token);
          setCountdown(data.expiresIn);
        })
        .catch((error) => console.error('Error fetching token:', error));
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (isLoading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }
  
  const handleCardSwipe = () => {
    useCard // Assuming '1' is the card ID
      .then((data) => {
        setUseCount(data.useCount);
        setGrowthStage(data.growthStage);
        setTreeData(data.treeData); // Assume the backend provides updated tree data
        if (data.token) {
          setToken(data.token);
          setCountdown(data.expiresIn);
        }
      })
      .catch((error) => console.error('Error using card:', error));
  };

  const formatToken = (token) => {
    // Apply obfuscation or formatting as needed
    if (token) {
      return token.slice(0, 4) + '-' + token.slice(4);
    }
    return '';
  };
  
  // Rendering the tree based on treeData or fallback to default
  const renderTree = () => {
    const currentStage = treeData || growthStages[growthStage];

    return (
      <Box className="tree-area" display="flex" flexDirection="column" alignItems="center">
        {/* Tree Trunk */}
        <motion.div
          className="tree-trunk"
          initial={{ height: 0 }}
          animate={{ height: currentStage.height }}
          transition={{ duration: 1 }}
        />

        {/* Tree Leaves */}
        <Box className="tree-leaves">
          {Array.from({ length: currentStage.leaves }).map((_, i) => {
            const leafStyle = {
              top: `${Math.random() * 40 + 40}px`,
              left: `${i * 30 + 40}px`,
            };

            // Integrate obfuscation logic from backend
            if (currentStage.obfuscation && currentStage.obfuscation.leafPositions) {
              leafStyle.top = currentStage.obfuscation.leafPositions[i].top;
              leafStyle.left = currentStage.obfuscation.leafPositions[i].left;
            }

            return (
              <motion.div
                key={i}
                className="leaf"
                initial="hidden"
                animate="visible"
                variants={leafVariants}
                style={leafStyle}
              >
                🌿
              </motion.div>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box className="main-container">
      {renderTree()}

      {/* Token Display */}
      <motion.div
        className="token-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="token-content" style={{ width: '100px', height: '100px' }}>
          <CircularProgressbarWithChildren
            value={countdown}
            maxValue={30} // Assuming the token expires in 30 seconds
            styles={buildStyles({
              pathColor: '#3f51b5',
              trailColor: '#d6d6d6',
            })}
          >
            <Typography variant="h6">{formatToken(token)}</Typography>
          </CircularProgressbarWithChildren>
        </Box>
      </motion.div>

      {/* Card Swipe Component */}
      <CardSwipeComponent onSwipe={handleCardSwipe} />

      {/* Usage Display */}
      <Typography variant="body2" mt={2}>
        {useCount}/{10} uses
      </Typography>
    </Box>
  );
};

export default CardComponent;
