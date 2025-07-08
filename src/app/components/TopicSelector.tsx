'use client';

import { Topic } from '../types';
import { TOPICS } from '../lib/constants';

interface TopicSelectorProps {
  selectedTopic: string | null;
  onTopicSelect: (topicId: string) => void;
  disabled?: boolean;
}

export default function TopicSelector({ selectedTopic, onTopicSelect, disabled = false }: TopicSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Choose Your Inspiration
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TOPICS.map((topic: Topic) => (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(topic.id)}
            disabled={disabled}
            className={`
              group relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300 transform hover:scale-105
              ${selectedTopic === topic.id 
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/25' 
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              border border-white/20 hover:border-white/40
            `}
          >
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="text-3xl mb-2">{topic.emoji}</div>
              <h3 className="text-lg font-semibold mb-1 text-white">
                {topic.name}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">
                {topic.description}
              </p>
            </div>
            
            {/* Selection indicator */}
            {selectedTopic === topic.id && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-300 text-sm">
          Select a topic to generate an inspiring quote
        </p>
      </div>
    </div>
  );
}
