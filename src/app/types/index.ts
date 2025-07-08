export interface Quote {
  text: string;
  author?: string;
  topic: string;
  source: 'web';
}

export interface Topic {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface QuoteResponse {
  success: boolean;
  quote?: Quote;
  error?: string;
}
