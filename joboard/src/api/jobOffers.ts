const API_ENDPOINT = 'https://training.nerdbord.io/api/v1/joboard/offers';

export const fetchJobOffers = async () => {
  const response = await fetch(API_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};