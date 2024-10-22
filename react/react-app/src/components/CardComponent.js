import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import './CardComponent.css';

const growthStages = [
  { stage: 'sapling', height: 50, leaves: 0 },
  { stage: 'small tree', height: 100, leaves: 3 },
  { stage: 'medium tree', height: 150, leaves: 5 },
  { stage: 'large tree', height: 200, leaves: 8 },
  { stage: 'fully grown', height: 250, leaves: 10 },
];

const leafVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const MainComponent = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [useCount, setUseCount] = useState(0);
  const [token, setToken] = useState('');
  const [countdown, setCountdown] = useState(30);
  const maxUses = 10;

  const useCardAndGrowTree = () => {
    if (useCount < maxUses) {
      setUseCount(useCount + 1);
      if (growthStage < growthStages.length - 1) {
        setGrowthStage(growthStage + 1);
      }
    }
  };

  const generateToken = () => {
    const newToken = Math.random().toString(36).substr(2, 8);
    setToken(newToken);
    setCountdown(30);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    } else {
      generateToken();
    }
  }, [countdown]);

  return (
    <Box className="main-container">
      <Box className="tree-area" display="flex" flexDirection="column" alignItems="center">
        {/* Tree Trunk */}
        <motion.div
          className="tree-trunk"
          initial={{ height: 0 }}
          animate={{ height: growthStages[growthStage].height }}
          transition={{ duration: 1 }}
        />

        {/* Tree Leaves */}
        <Box className="tree-leaves">
          {Array.from({ length: growthStages[growthStage].leaves }).map((_, i) => (
            <motion.div
              key={i}
              className="leaf"
              initial="hidden"
              animate="visible"
              variants={leafVariants}
              style={{
                top: `${Math.random() * 40 + 40}px`,
                left: `${i * 30 + 40}px`,
              }}
            >
              🌿
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Token Display */}
      <motion.div
        className="token-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="token-content">
          <Typography variant="h6">{token}</Typography>
          <Typography variant="body2">Expires in: {countdown} seconds</Typography>
        </Box>
      </motion.div>

      {/* Button and Usage Display */}
      <Button
        variant="contained"
        color="primary"
        onClick={useCardAndGrowTree}
        className="use-card-button"
      >
        Use Card & Grow Tree
      </Button>
      <Typography variant="body2" mt={2}>
        {useCount}/{maxUses} uses
      </Typography>
    </Box>
  );
};

export default MainComponent;
