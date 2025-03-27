const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SANDBOX_SECRET,
    },
  },
});
const plaidClient = new PlaidApi(configuration);

// Creates a link token required to initialize Plaid Link
async function createLinkToken() {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'unique_user_id' },
      client_name: 'Your App Name',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en'
    });
    
    return response.data.link_token;
  } catch (error) {
    console.error('Error creating link token:', error);
    throw error;
  }
}

// Exchanges the public token received from Plaid Link for an access token
async function exchangePublicToken(publicToken) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error exchanging public token:', error);
    throw error;
  }
} 