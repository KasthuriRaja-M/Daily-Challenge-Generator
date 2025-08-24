export const challengeCategories = {
  FITNESS: 'fitness',
  CREATIVITY: 'creativity',
  LEARNING: 'learning',
  SOCIAL: 'social',
  MINDFULNESS: 'mindfulness',
  PRODUCTIVITY: 'productivity',
  ADVENTURE: 'adventure',
  HEALTH: 'health'
};

export const challenges = {
  [challengeCategories.FITNESS]: [
    "Do 50 jumping jacks",
    "Take a 30-minute walk",
    "Do 20 push-ups",
    "Try a new yoga pose",
    "Go for a 15-minute run",
    "Do 30 squats",
    "Stretch for 10 minutes",
    "Try a new workout video",
    "Walk 10,000 steps",
    "Do a 5-minute plank challenge",
    "Try a new sport or activity",
    "Do 25 burpees",
    "Take the stairs instead of elevator",
    "Do a 20-minute HIIT workout",
    "Practice balance exercises"
  ],
  
  [challengeCategories.CREATIVITY]: [
    "Draw something from memory",
    "Write a 100-word story",
    "Take 5 creative photos",
    "Learn a new craft technique",
    "Create a playlist for a mood",
    "Write a poem",
    "Design a logo for yourself",
    "Paint with your non-dominant hand",
    "Create a collage from magazines",
    "Write a letter to your future self",
    "Make something from recycled materials",
    "Learn to play a new song on an instrument",
    "Create a vision board",
    "Write a short script",
    "Try a new art medium"
  ],
  
  [challengeCategories.LEARNING]: [
    "Learn 5 new words in a foreign language",
    "Read a chapter of a book",
    "Watch an educational video",
    "Learn a new skill online",
    "Research a topic you're curious about",
    "Listen to a podcast episode",
    "Practice mental math for 10 minutes",
    "Learn about a historical event",
    "Try solving a puzzle or brain teaser",
    "Learn about a different culture",
    "Study a new programming concept",
    "Learn about space and astronomy",
    "Practice speed reading",
    "Learn about a famous person's life",
    "Study a new scientific concept"
  ],
  
  [challengeCategories.SOCIAL]: [
    "Call a friend you haven't talked to in a while",
    "Compliment 3 people today",
    "Start a conversation with a stranger",
    "Send a thank you message to someone",
    "Share a positive story on social media",
    "Ask someone about their day and really listen",
    "Give someone a genuine compliment",
    "Reconnect with an old friend",
    "Help someone without being asked",
    "Share a joke to make someone laugh",
    "Thank someone who has helped you",
    "Give someone a hug",
    "Tell someone you appreciate them",
    "Invite someone to join you for an activity",
    "Write a positive review for a local business"
  ],
  
  [challengeCategories.MINDFULNESS]: [
    "Meditate for 10 minutes",
    "Practice deep breathing for 5 minutes",
    "Write down 3 things you're grateful for",
    "Spend 15 minutes in nature",
    "Practice mindful eating for one meal",
    "Do a body scan meditation",
    "Write in a journal for 10 minutes",
    "Practice positive affirmations",
    "Take a digital detox for 2 hours",
    "Practice mindful walking",
    "Listen to calming music",
    "Practice progressive muscle relaxation",
    "Write down your thoughts and feelings",
    "Practice loving-kindness meditation",
    "Spend time in silence"
  ],
  
  [challengeCategories.PRODUCTIVITY]: [
    "Organize your workspace",
    "Create a to-do list for tomorrow",
    "Declutter one area of your home",
    "Set 3 specific goals for the week",
    "Learn a new productivity technique",
    "Create a morning routine",
    "Track your time for one day",
    "Automate one repetitive task",
    "Learn a keyboard shortcut",
    "Create a filing system",
    "Set up a new organizational tool",
    "Review and update your calendar",
    "Create a budget or financial plan",
    "Learn about time management",
    "Create a habit tracker"
  ],
  
  [challengeCategories.ADVENTURE]: [
    "Visit a new place in your city",
    "Try a new restaurant",
    "Take a different route to work/school",
    "Explore a new neighborhood",
    "Try a new hobby or activity",
    "Visit a museum or gallery",
    "Go on a spontaneous day trip",
    "Try a new type of cuisine",
    "Visit a local landmark you've never seen",
    "Take a class in something new",
    "Go to a local event or festival",
    "Try a new mode of transportation",
    "Visit a park you've never been to",
    "Try a new outdoor activity",
    "Explore a new hiking trail"
  ],
  
  [challengeCategories.HEALTH]: [
    "Drink 8 glasses of water",
    "Eat a healthy breakfast",
    "Get 8 hours of sleep",
    "Take vitamins if you have them",
    "Eat a serving of vegetables",
    "Limit screen time before bed",
    "Practice good posture all day",
    "Take regular breaks from sitting",
    "Eat mindfully without distractions",
    "Try a new healthy recipe",
    "Practice good hand hygiene",
    "Stretch every hour",
    "Eat a piece of fruit",
    "Practice good dental hygiene",
    "Take a 5-minute break every hour"
  ]
};

export const getRandomChallenge = (category = null) => {
  if (category && challenges[category]) {
    const categoryChallenges = challenges[category];
    return categoryChallenges[Math.floor(Math.random() * categoryChallenges.length)];
  }
  
  // Get random category if none specified
  const categories = Object.keys(challenges);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryChallenges = challenges[randomCategory];
  
  return {
    challenge: categoryChallenges[Math.floor(Math.random() * categoryChallenges.length)],
    category: randomCategory
  };
};

export const getChallengesByCategory = (category) => {
  return challenges[category] || [];
};

export const getAllCategories = () => {
  return Object.keys(challengeCategories).map(key => ({
    key: challengeCategories[key],
    label: key.charAt(0) + key.slice(1).toLowerCase()
  }));
};
