import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, Zap } from 'lucide-react';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 1rem;
`;

const ChallengeText = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const CompletedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(76, 175, 80, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ChallengeCard = ({ 
  challenge, 
  category, 
  onComplete, 
  onSkip, 
  isCompleted = false,
  completedAt = null 
}) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'fitness': return <Zap size={16} />;
      case 'creativity': return <Target size={16} />;
      case 'learning': return <Target size={16} />;
      case 'social': return <Target size={16} />;
      case 'mindfulness': return <Target size={16} />;
      case 'productivity': return <Target size={16} />;
      case 'adventure': return <Target size={16} />;
      case 'health': return <Target size={16} />;
      default: return <Target size={16} />;
    }
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isCompleted && (
        <CompletedOverlay>
          <CheckCircle size={24} style={{ marginRight: '0.5rem' }} />
          Completed!
        </CompletedOverlay>
      )}
      
      <CategoryBadge>
        {getCategoryIcon(category)}
        {category}
      </CategoryBadge>
      
      <ChallengeText>{challenge}</ChallengeText>
      
      <StatsContainer>
        <Stat>
          <IconWrapper>
            <Clock size={16} />
          </IconWrapper>
          Daily Challenge
        </Stat>
        <Stat>
          <IconWrapper>
            <Target size={16} />
          </IconWrapper>
          {category}
        </Stat>
      </StatsContainer>

      {completedAt && (
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Completed on {formatDate(completedAt)}
        </div>
      )}

      {!isCompleted && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <ActionButton
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ flex: 1 }}
          >
            Complete Challenge
          </ActionButton>
          <ActionButton
            onClick={onSkip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              flex: 1, 
              background: 'transparent', 
              color: '#667eea',
              border: '2px solid #667eea'
            }}
          >
            Skip
          </ActionButton>
        </div>
      )}
    </Card>
  );
};

export default ChallengeCard;
