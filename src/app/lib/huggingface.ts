import { Quote } from '../types';
import { FALLBACK_QUOTES } from './constants';

export class QuoteService {
  async generateQuote(topic: string): Promise<Quote> {
    try {
      // Try Quotable API first
      const webQuote = await this.searchWebQuote(topic);
      if (webQuote) {
        return webQuote;
      }

      // Fallback to predefined quotes
      return this.getFallbackQuote(topic);
    } catch (error) {
      console.error('Error generating quote:', error);
      return this.getFallbackQuote(topic);
    }
  }

  private async searchWebQuote(topic: string): Promise<Quote | null> {
    try {
      // Using Quotable API
      const response = await fetch(`https://api.quotable.io/random?maxLength=200&tags=${topic}`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          text: data.content,
          author: data.author,
          topic,
          source: 'web'
        };
      }

      // Try without tags if topic-specific search fails
      const generalResponse = await fetch('https://api.quotable.io/random?maxLength=200', {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (generalResponse.ok) {
        const generalData = await generalResponse.json();
        return {
          text: generalData.content,
          author: generalData.author,
          topic,
          source: 'web'
        };
      }

      return null;
    } catch (error) {
      console.error('Quotable API error:', error);
      return null;
    }
  }

  private getFallbackQuote(topic: string): Quote {
    const quotes = FALLBACK_QUOTES[topic as keyof typeof FALLBACK_QUOTES] || FALLBACK_QUOTES.inspiration;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    return {
      text: randomQuote.text,
      author: randomQuote.author,
      topic,
      source: 'web'
    };
  }

  validateQuote(quote: Quote): boolean {
    return !!(
      quote.text &&
      quote.text.length > 10 &&
      quote.text.length < 500 &&
      quote.topic &&
      typeof quote.text === 'string'
    );
  }

  formatQuote(quote: Quote): Quote {
    return {
      ...quote,
      text: quote.text.trim(),
      author: quote.author?.trim() || 'Unknown'
    };
  }
}
