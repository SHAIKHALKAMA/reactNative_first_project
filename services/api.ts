const BASE_URL = 'https://app.swimwell.co.in/api';
import { getAuthToken, getGuestToken } from '@/services/tokenStorage';
import axios from 'axios';


const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODRkZjk5N2UwY2YxZTM5ZjAyNmQ4OTViZGE2Y2RmMDBkMmIwZTZmMDZjYTg0M2U0OTNhN2Y1OWExOTkwODFjMWY5ZDA5OGY0MDg4MDBhMDYiLCJpYXQiOjE3NzAzNTY0MTMuMzUzNDUsIm5iZiI6MTc3MDM1NjQxMy4zNTM0NzQsImV4cCI6MTgwMTg5MjQxMy4zNTAwNSwic3ViIjoiMTIiLCJzY29wZXMiOltdfQ.C9D1ZKfHneUOaXJBGaykF4sWEtNoPlei3wqSZt59hbswd9tlUERUxi29bPn1dnyu70mDTe2F_lKGum4I2a2Cmi-3swTDYXkLdaTFgEoWcEJYaHEkQr9yMRsDJuEw8PVDwP-e3fSRrGG3hBvuCO1LaAcbHRvkCtogwTTJJc3zMoe9bwz9hgz8hva7ji0pKe_9ZckMhnMjaVefF-5jlqwqcyk7NdCIDo54WnYk19UVwkR1EOT1owYmku8jcNkxUG-znh4loze1OJuz4PzeBapfzrl3lpOiORQB2fPdg4Bb8N4bQl1hZuIzRBm3lwlMiuO8aoDmcw_kp3rUIE1ld66IoKyPvZDTcjLucZtqq2Do5vBaXtiuVhAomHmv2rPCwx8OkL0aLEhk7tuZn37aH-PlamDw7uEFXNd0ml92_oHK9ROexsQQ91kOOlmkAQ7bqKi7xgdnoBcFp5SEpqPjSRt8UaCaF458bX0-jrT83FowcKdaTX-2L-q0j_ONxtZV1ZoY9e41mT4syzget0x2kKhn7VlIb5KS7XFNrX0r67M9LwgCjRQG0xDzH1L4qKP9WnHqFR8zv9zXa7Vh1VDzAcvbzjMO_R5zmPZeSuPksawDFlPMPeLqbnhEVe4acNo0WT64tiB-FUC0uBRHhbYD7ipb2KIdRufOaydNF2IZOhrog8Y'; // 🔥 Replace with your stored token

export const apiGet = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Service API Error:', error);
    throw error;
  }
};

export const getProductDetails = async (id: number) => {
  const authToken = await getAuthToken();
  const guestToken = await getGuestToken();
  const headers: any = {
    Accept: 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  } else if (guestToken) {
    headers['guest-token'] = guestToken;
  }

  const response = await axios.get(
    `https://app.swimwell.co.in/api/product-detail?product_id=${id}`,
    { headers }
  );

  return response.data;
};
