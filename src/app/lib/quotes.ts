import { Quote } from '../types';
import { QuoteService } from './quote-service';
import { GENERAL_QUOTES } from './fallback-quotes';

export class QuoteManager {
  private quoteService: QuoteService;

  constructor() {
    this.quoteService = new QuoteService();
  }

  async getQuote(topic: string): Promise<Quote> {
    try {
      const quote = await this.quoteService.generateQuote(topic);
      return this.quoteService.formatQuote(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Return a random general quote as ultimate fallback
      const randomQuote = GENERAL_QUOTES[Math.floor(Math.random() * GENERAL_QUOTES.length)];
      console.log(`🆘 Using emergency general quote for topic: ${topic}`);
      return {
        text: randomQuote.text,
        author: randomQuote.author,
        topic,
        source: 'web'
      };
    }
  }

  validateQuote(quote: Quote): boolean {
    return this.quoteService.validateQuote(quote);
  }

  formatQuote(quote: Quote): Quote {
    return this.quoteService.formatQuote(quote);
  }
}
