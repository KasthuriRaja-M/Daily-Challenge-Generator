import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Target, Settings } from 'lucide-react';
import { format } from 'date-fns';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const DateDisplay = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const Stat = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = ({ 
  completedChallenges = 0, 
  currentStreak = 0, 
  totalChallenges = 0,
  onLogoClick 
}) => {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM do, yyyy');

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo 
          onClick={onLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogoIcon>
            <Target size={20} />
          </LogoIcon>
          Daily Challenges
        </Logo>

        <DateDisplay>
          <Calendar size={18} />
          {formattedDate}
        </DateDisplay>

        <StatsContainer>
          <Stat
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <IconWrapper>
              <Trophy size={16} />
            </IconWrapper>
            {completedChallenges} Completed
          </Stat>

          <Stat
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <IconWrapper>
              <Target size={16} />
            </IconWrapper>
            {currentStreak} Day Streak
          </Stat>

          <Stat
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <IconWrapper>
              <Settings size={16} />
            </IconWrapper>
            {totalChallenges} Total
          </Stat>
        </StatsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
