// Test script to verify Quotable API integration
// Run this in the browser console to test the API

async function testQuotableAPI() {
  console.log('🧪 Testing Quotable API...');
  
  const topics = ['motivation', 'love', 'success', 'wisdom', 'life', 'inspiration'];
  
  for (const topic of topics) {
    console.log(`\n📋 Testing topic: ${topic}`);
    
    try {
      const response = await fetch(`/api/quotes?topic=${topic}`);
      const data = await response.json();
      
      if (data.success && data.quote) {
        console.log(`✅ ${topic}: "${data.quote.text.substring(0, 50)}..." - ${data.quote.author}`);
      } else {
        console.log(`❌ ${topic}: Failed - ${data.error}`);
      }
    } catch (error) {
      console.log(`❌ ${topic}: Error - ${error.message}`);
    }
    
    // Wait a bit between requests to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

// Run the test
testQuotableAPI();
