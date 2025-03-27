import { usePlaidLink } from 'react-plaid-link';

function PlaidLinkButton({ linkToken, onSuccess }) {
  const { open, ready } = usePlaidLink({
    //the link_token from your server
    token: linkToken,

    // metadata contains additional information about the connected account
    onSuccess: (public_token, metadata) => {
      // The access_token is what you'll use for future API calls
      onSuccess(public_token);
    },
  });

  return (
    <button 
      onClick={() => open()} //launches Plaid Link modal when clicked
      disabled={!ready}
    >
      Connect a bank account
    </button>
  );
}

export default PlaidLinkButton; 