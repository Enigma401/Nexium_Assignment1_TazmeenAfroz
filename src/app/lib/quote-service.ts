import { Quote } from '../types';
import { FALLBACK_QUOTES } from './constants';
import { EXTENDED_FALLBACK_QUOTES, GENERAL_QUOTES } from './fallback-quotes';

export class QuoteService {
  async generateQuote(topic: string): Promise<Quote> {
    try {
      const webQuote = await this.searchWebQuote(topic);
      if (webQuote) {
        return webQuote;
      }
      return this.getFallbackQuote(topic);
    } catch {
      return this.getFallbackQuote(topic);
    }
  }

  private async searchWebQuote(topic: string): Promise<Quote | null> {
    try {
      try {
        const response = await fetch('https://zenquotes.io/api/random', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data) && data[0] && data[0].q && data[0].a) {
            return {
              text: data[0].q,
              author: data[0].a,
              topic,
              source: 'web'
            };
          }
        }
      } catch {
        // Continue to next API
      }

      try {
        const response = await fetch('https://quotegarden.herokuapp.com/api/v3/quotes/random', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.statusCode === 200 && data.data && data.data.quoteText && data.data.quoteAuthor) {
            return {
              text: data.data.quoteText.replace(/^["']|["']$/g, ''),
              author: data.data.quoteAuthor,
              topic,
              source: 'web'
            };
          }
        }
      } catch {
        // Continue to next API
      }

      try {
        const response = await fetch('https://api.jsonbin.io/v3/qs/6655f0f8ad19ca34f86c3777', {
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.record && Array.isArray(data.record)) {
            const randomQuote = data.record[Math.floor(Math.random() * data.record.length)];
            if (randomQuote && randomQuote.quote && randomQuote.author) {
              return {
                text: randomQuote.quote,
                author: randomQuote.author,
                topic,
                source: 'web'
              };
            }
          }
        }
      } catch {
        // Continue to fallback
      }

      return null;
    } catch {
      return null;
    }
  }

  private getFallbackQuote(topic: string): Quote {
    const extendedQuotes = EXTENDED_FALLBACK_QUOTES[topic as keyof typeof EXTENDED_FALLBACK_QUOTES];
    if (extendedQuotes && extendedQuotes.length > 0) {
      const randomQuote = extendedQuotes[Math.floor(Math.random() * extendedQuotes.length)];
      return {
        text: randomQuote.text,
        author: randomQuote.author,
        topic,
        source: 'web'
      };
    }

    const originalQuotes = FALLBACK_QUOTES[topic as keyof typeof FALLBACK_QUOTES];
    if (originalQuotes && originalQuotes.length > 0) {
      const randomQuote = originalQuotes[Math.floor(Math.random() * originalQuotes.length)];
      return {
        text: randomQuote.text,
        author: randomQuote.author,
        topic,
        source: 'web'
      };
    }

    const randomQuote = GENERAL_QUOTES[Math.floor(Math.random() * GENERAL_QUOTES.length)];
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
