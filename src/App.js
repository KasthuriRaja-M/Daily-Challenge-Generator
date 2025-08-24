import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Target } from 'lucide-react';

import Header from './components/Header';
import ChallengeCard from './components/ChallengeCard';
import CategoryFilter from './components/CategoryFilter';
import ProgressChart from './components/ProgressChart';

import { getRandomChallenge, getAllCategories } from './data/challenges';
import { calculateStreak, getWeeklyStats } from './utils/dateUtils';
import useLocalStorage from './hooks/useLocalStorage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ChallengeSection = styled.section`
  padding: 0 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ChallengeContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const GenerateButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: white;
  padding: 3rem 1rem;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const StatsSection = styled.section`
  padding: 0 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const App = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useLocalStorage('completedChallenges', []);
  const [skippedChallenges, setSkippedChallenges] = useLocalStorage('skippedChallenges', []);
  const [showProgress, setShowProgress] = useState(false);

  // Generate initial challenge on app load
  useEffect(() => {
    if (!currentChallenge) {
      generateNewChallenge();
    }
  }, []);

  const generateNewChallenge = () => {
    const newChallenge = getRandomChallenge(selectedCategory);
    setCurrentChallenge(newChallenge);
  };

  const handleCompleteChallenge = () => {
    if (!currentChallenge) return;

    const completedChallenge = {
      ...currentChallenge,
      completedAt: new Date().toISOString(),
      id: Date.now()
    };

    setCompletedChallenges(prev => [...prev, completedChallenge]);
    generateNewChallenge();
  };

  const handleSkipChallenge = () => {
    if (!currentChallenge) return;

    const skippedChallenge = {
      ...currentChallenge,
      skippedAt: new Date().toISOString(),
      id: Date.now()
    };

    setSkippedChallenges(prev => [...prev, skippedChallenge]);
    generateNewChallenge();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    generateNewChallenge();
  };

  const handleLogoClick = () => {
    setShowProgress(!showProgress);
  };

  // Calculate statistics
  const totalCompleted = completedChallenges.length;
  const totalSkipped = skippedChallenges.length;
  const totalChallenges = totalCompleted + totalSkipped;
  const completionRate = totalChallenges > 0 ? Math.round((totalCompleted / totalChallenges) * 100) : 0;
  
  const completedDates = completedChallenges.map(c => c.completedAt);
  const currentStreak = calculateStreak(completedDates);
  
  const uniqueCategories = new Set(completedChallenges.map(c => c.category)).size;
  
  const weeklyStats = getWeeklyStats(completedChallenges);

  const totalStats = {
    completed: totalCompleted,
    streak: currentStreak,
    accuracy: completionRate,
    categories: uniqueCategories
  };

  return (
    <AppContainer>
      <Header
        completedChallenges={totalCompleted}
        currentStreak={currentStreak}
        totalChallenges={totalChallenges}
        onLogoClick={handleLogoClick}
      />

      <MainContent>
        <AnimatePresence mode="wait">
          {showProgress ? (
            <motion.div
              key="progress"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <StatsSection>
                <SectionTitle>
                  <Target size={28} />
                  Your Progress
                </SectionTitle>
                <ProgressChart 
                  weeklyData={weeklyStats}
                  totalStats={totalStats}
                />
              </StatsSection>
            </motion.div>
          ) : (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
            >
              <ChallengeSection>
                <SectionTitle>
                  <Sparkles size={28} />
                  Today's Challenge
                </SectionTitle>

                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />

                <ChallengeContainer>
                  {currentChallenge ? (
                    <ChallengeCard
                      challenge={currentChallenge.challenge || currentChallenge}
                      category={currentChallenge.category}
                      onComplete={handleCompleteChallenge}
                      onSkip={handleSkipChallenge}
                    />
                  ) : (
                    <EmptyState>
                      <EmptyStateIcon>🎯</EmptyStateIcon>
                      <EmptyStateText>
                        Click the button below to generate your first challenge!
                      </EmptyStateText>
                    </EmptyState>
                  )}
                </ChallengeContainer>

                <GenerateButton
                  onClick={generateNewChallenge}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={20} />
                  Generate New Challenge
                </GenerateButton>
              </ChallengeSection>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>
    </AppContainer>
  );
};

export default App;
