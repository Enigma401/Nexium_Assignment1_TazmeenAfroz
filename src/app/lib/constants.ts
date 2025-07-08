import { Topic } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'motivation',
    name: 'Motivation',
    emoji: '💪',
    description: 'Inspiring quotes to boost your drive'
  },
  {
    id: 'love',
    name: 'Love',
    emoji: '❤️',
    description: 'Beautiful quotes about love and relationships'
  },
  {
    id: 'success',
    name: 'Success',
    emoji: '🏆',
    description: 'Wisdom for achieving your goals'
  },
  {
    id: 'wisdom',
    name: 'Wisdom',
    emoji: '🧠',
    description: 'Deep thoughts and life lessons'
  },
  {
    id: 'life',
    name: 'Life',
    emoji: '🌟',
    description: 'Reflections on the journey of life'
  },
  {
    id: 'inspiration',
    name: 'Inspiration',
    emoji: '✨',
    description: 'Uplifting quotes to spark creativity'
  }
];

export const FALLBACK_QUOTES = {
  motivation: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
  ],
  love: [
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
    { text: "Love is not about how many days, months, or years you have been together.", author: "Unknown" },
    { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" }
  ],
  success: [
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" }
  ],
  wisdom: [
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
  ],
  life: [
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" }
  ],
  inspiration: [
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
  ]
};
