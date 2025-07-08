import { NextRequest, NextResponse } from 'next/server';
import { QuoteManager } from '../../lib/quotes';
import { QuoteResponse } from '../../types';

const quoteManager = new QuoteManager();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');

    if (!topic) {
      return NextResponse.json<QuoteResponse>(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    const quote = await quoteManager.getQuote(topic);
    
    if (!quoteManager.validateQuote(quote)) {
      return NextResponse.json<QuoteResponse>(
        { success: false, error: 'Failed to generate valid quote' },
        { status: 500 }
      );
    }

    const formattedQuote = quoteManager.formatQuote(quote);

    return NextResponse.json<QuoteResponse>({
      success: true,
      quote: formattedQuote
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json<QuoteResponse>(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json<QuoteResponse>(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    const quote = await quoteManager.getQuote(topic);
    const formattedQuote = quoteManager.formatQuote(quote);

    return NextResponse.json<QuoteResponse>({
      success: true,
      quote: formattedQuote
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json<QuoteResponse>(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
