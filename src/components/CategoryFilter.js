import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getAllCategories } from '../data/challenges';

const FilterContainer = styled.div`
  margin: 2rem 0;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FilterTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.8rem;
  }
`;

const CategoryButton = styled(motion.button)`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
    : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 2px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'};
  padding: 1rem;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-height: 80px;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #667eea, #764ba2)' 
      : 'rgba(255, 255, 255, 0.2)'};
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    min-height: 70px;
    font-size: 0.9rem;
  }
`;

const CategoryIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
`;

const CategoryLabel = styled.span`
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const getCategoryIcon = (category) => {
  const icons = {
    fitness: '💪',
    creativity: '🎨',
    learning: '📚',
    social: '👥',
    mindfulness: '🧘',
    productivity: '⚡',
    adventure: '🗺️',
    health: '❤️'
  };
  return icons[category] || '🎯';
};

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = getAllCategories();

  return (
    <FilterContainer>
      <FilterTitle>Choose a Category</FilterTitle>
      <CategoryGrid>
        <CategoryButton
          active={!selectedCategory}
          onClick={() => onCategoryChange(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CategoryIcon active={!selectedCategory}>🎯</CategoryIcon>
          <CategoryLabel>All Categories</CategoryLabel>
        </CategoryButton>
        
        {categories.map((category) => (
          <CategoryButton
            key={category.key}
            active={selectedCategory === category.key}
            onClick={() => onCategoryChange(category.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CategoryIcon active={selectedCategory === category.key}>
              {getCategoryIcon(category.key)}
            </CategoryIcon>
            <CategoryLabel>{category.label}</CategoryLabel>
          </CategoryButton>
        ))}
      </CategoryGrid>
    </FilterContainer>
  );
};

export default CategoryFilter;
