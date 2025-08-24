import { format, isToday, isYesterday, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

export const formatDisplayDate = (date) => {
  const dateObj = new Date(date);
  
  if (isToday(dateObj)) {
    return 'Today';
  } else if (isYesterday(dateObj)) {
    return 'Yesterday';
  } else {
    return format(dateObj, 'MMM dd, yyyy');
  }
};

export const getCurrentWeekDays = () => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 0 }); // Sunday
  const end = endOfWeek(now, { weekStartsOn: 0 });
  
  return eachDayOfInterval({ start, end }).map(date => ({
    date: formatDate(date),
    day: format(date, 'EEE'),
    fullDay: format(date, 'EEEE')
  }));
};

export const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) return 0;
  
  const sortedDates = completedDates
    .map(date => new Date(date))
    .sort((a, b) => b - a); // Sort descending
  
  let streak = 0;
  let currentDate = new Date();
  
  for (let i = 0; i < sortedDates.length; i++) {
    const completedDate = sortedDates[i];
    
    if (i === 0) {
      // Check if the most recent completion is today or yesterday
      if (isToday(completedDate) || isYesterday(completedDate)) {
        streak = 1;
        currentDate = completedDate;
      } else {
        break;
      }
    } else {
      // Check if this completion is consecutive
      const daysDiff = Math.floor((currentDate - completedDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        streak++;
        currentDate = completedDate;
      } else {
        break;
      }
    }
  }
  
  return streak;
};

export const getWeeklyStats = (completedChallenges) => {
  const weekDays = getCurrentWeekDays();
  const weeklyData = weekDays.map(day => ({
    day: day.day,
    date: day.date,
    completed: 0
  }));
  
  if (!completedChallenges) return weeklyData;
  
  completedChallenges.forEach(challenge => {
    const challengeDate = formatDate(challenge.completedAt);
    const weekDay = weeklyData.find(day => day.date === challengeDate);
    
    if (weekDay) {
      weekDay.completed++;
    }
  });
  
  return weeklyData;
};

export const isSameDay = (date1, date2) => {
  return formatDate(date1) === formatDate(date2);
};

export const getDaysSince = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffTime = Math.abs(now - targetDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
