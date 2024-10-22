
export const fetchCardData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/cards/1`);
    return response.json();
  };
  
  export const useCard = async (cardId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/cards/${cardId}/use`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  
  export const fetchToken = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tokens`);
    return response.json();
  };
  