import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import PrintBotLanding from './PrintBotLanding';

// Keyframe animation for rotating circles
const connect = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

// Styled-components for the rotating circles
const SmartGlassContainer = styled.div`
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 288px;
  height: 388px;
  font-family: 'Play', sans-serif;
`;

const LogoContainer = styled.div`
  width: 288px;
  height: 288px;
  position: relative;
`;

const Circle = styled.div`
  padding: 20px;
  border: 6px solid transparent;
  border-top-color: #bf57ff; /* Changed color to purple */
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${connect} 2.5s linear infinite;
`;

const LoadingText = styled.div`
  text-transform: uppercase;
  color: #000; /* Changed color to black */
  text-align: center;
  margin: 10px 0;
  font-size: 1.4rem;
`;

// Main integrated component
export default function PrintBotOpening() {
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(true), 8000); // 8-second delay
    return () => clearTimeout(timer);
  }, []);

  if (showLanding) {
    return <PrintBotLanding />;
  }

  return (
    <SmartGlassContainer>
      <LogoContainer>
        <Circle>
          <Circle>
            <Circle />
          </Circle>
        </Circle>
      </LogoContainer>
  
    </SmartGlassContainer>
  );
}
