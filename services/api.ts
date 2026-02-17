const BASE_URL = 'https://app.swimwell.co.in/api';

export const apiGet = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: '', // if required
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('API Error:', error);
    throw error;
  }
};


export const getServices = async () => {
  try {
    const response = await fetch(
      'https://app.swimwell.co.in/api/service',
      {
        method: 'GET',
        headers: {
          token: '',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Service API Error:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(
      'https://app.swimwell.co.in/api/product',
      {
        method: 'GET',
        headers: {
          token: '',
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Service API Error:', error);
    throw error;
  }
};

export const getProductDetails = async (id: number, token: string) => {
  try {
    const response = await fetch(
      `https://app.swimwell.co.in/api/product-detail?product_id=${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Service API Error:', error);
    throw error;
  }
};





