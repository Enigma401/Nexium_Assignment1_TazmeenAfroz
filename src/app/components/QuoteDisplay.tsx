'use client';

import { useState } from 'react';
import { Quote } from '../types';

interface QuoteDisplayProps {
  quote: Quote | null;
  onNewQuote: () => void;
  isLoading: boolean;
}

export default function QuoteDisplay({ quote, onNewQuote, isLoading }: QuoteDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!quote) return;
    
    const textToCopy = `"${quote.text}" ${quote.author ? `- ${quote.author}` : ''}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!quote && !isLoading) {
    return (
      <div className="text-center text-gray-400 p-8">
        <div className="text-6xl mb-4">💭</div>
        <p className="text-lg">Select a topic to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 relative overflow-hidden">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50"></div>
        
        <div className="relative z-10">
          {quote && (
            <>
              {/* Quote text */}
              <div className="mb-6">
                <svg className="w-8 h-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-light italic">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
              </div>

              {/* Author */}
              {quote.author && (
                <div className="mb-6 text-right">
                  <p className="text-white/80 text-lg">
                    — {quote.author}
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={onNewQuote}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>New Quote</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
