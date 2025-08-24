import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Target } from 'lucide-react';

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 2rem 0;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem 0;
  }
`;

const ChartTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #dee2e6;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const WeeklyChart = styled.div`
  margin-top: 2rem;
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const DayLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-align: center;
`;

const DayBar = styled(motion.div)`
  width: 100%;
  background: ${props => props.completed ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#e9ecef'};
  border-radius: 4px;
  min-height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.completed ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  }
`;

const BarValue = styled.span`
  position: relative;
  z-index: 1;
  margin-bottom: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #666;
  padding: 3rem 1rem;
  font-size: 1.1rem;
`;

const ProgressChart = ({ weeklyData = [], totalStats = {} }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Fill in missing days with 0
  const completeWeekData = daysOfWeek.map((day, index) => {
    const existingData = weeklyData.find(d => d.day === day);
    return existingData || { day, completed: 0 };
  });

  const hasData = weeklyData.length > 0 || Object.keys(totalStats).length > 0;

  if (!hasData) {
    return (
      <ChartContainer>
        <ChartTitle>
          <TrendingUp size={20} />
          Progress Overview
        </ChartTitle>
        <EmptyState>
          <Target size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>Complete your first challenge to see your progress!</p>
        </EmptyState>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>
        <TrendingUp size={20} />
        Progress Overview
      </ChartTitle>

      <ChartGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatValue>{totalStats.completed || 0}</StatValue>
          <StatLabel>Challenges Completed</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatValue>{totalStats.streak || 0}</StatValue>
          <StatLabel>Day Streak</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatValue>{totalStats.accuracy || 0}%</StatValue>
          <StatLabel>Completion Rate</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatValue>{totalStats.categories || 0}</StatValue>
          <StatLabel>Categories Explored</StatLabel>
        </StatCard>
      </ChartGrid>

      <WeeklyChart>
        <h4 style={{ marginBottom: '1rem', color: '#333', fontSize: '1.1rem' }}>
          This Week's Activity
        </h4>
        <WeekDays>
          {completeWeekData.map((dayData, index) => (
            <DayColumn key={dayData.day}>
              <DayLabel>{dayData.day}</DayLabel>
              <DayBar
                completed={dayData.completed > 0}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                style={{
                  height: `${Math.max(60, dayData.completed * 20)}px`
                }}
              >
                {dayData.completed > 0 && (
                  <BarValue>{dayData.completed}</BarValue>
                )}
              </DayBar>
            </DayColumn>
          ))}
        </WeekDays>
      </WeeklyChart>
    </ChartContainer>
  );
};

export default ProgressChart;
