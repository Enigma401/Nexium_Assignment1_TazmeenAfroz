'use client';

import { useState, useCallback } from 'react';
import { Quote, QuoteResponse } from '../types';
import TopicSelector from './TopicSelector';
import QuoteDisplay from './QuoteDisplay';
import LoadingSpinner from './LoadingSpinner';

export default function QuoteGenerator() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async (topic: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/quotes?topic=${encodeURIComponent(topic)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: QuoteResponse = await response.json();

      if (data.success && data.quote) {
        setCurrentQuote(data.quote);
      } else {
        throw new Error(data.error || 'Failed to fetch quote');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching quote:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTopicSelect = useCallback(async (topicId: string) => {
    setSelectedTopic(topicId);
    await fetchQuote(topicId);
  }, [fetchQuote]);

  const handleNewQuote = useCallback(async () => {
    if (selectedTopic) {
      await fetchQuote(selectedTopic);
    }
  }, [selectedTopic, fetchQuote]);

  const handleRetry = useCallback(() => {
    setError(null);
    if (selectedTopic) {
      fetchQuote(selectedTopic);
    }
  }, [selectedTopic, fetchQuote]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
          Quote Generator
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover inspiring quotes from around the web
        </p>
      </div>

      {/* Error handling */}
      {error && (
        <div className="w-full max-w-md mx-auto mb-6">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="mt-2 text-red-300 hover:text-red-200 text-sm underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Topic Selection */}
        {!currentQuote && !isLoading && (
          <TopicSelector
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
            disabled={isLoading}
          />
        )}

        {/* Loading state */}
        {isLoading && <LoadingSpinner />}

        {/* Quote display */}
        {currentQuote && !isLoading && (
          <div className="space-y-6">
            <QuoteDisplay
              quote={currentQuote}
              onNewQuote={handleNewQuote}
              isLoading={isLoading}
            />
            
            {/* Back to topics button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentQuote(null);
                  setSelectedTopic(null);
                }}
                className="text-gray-400 hover:text-gray-200 text-sm underline transition-colors duration-200"
              >
                ← Choose a different topic
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-gray-400 text-sm">
          Made using Next.js, Tailwind CSS & Zen Quote API
        </p>
      </div>
    </div>
  );
}
