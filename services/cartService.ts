import axios from 'axios';

const BASE_URL = 'https://app.swimwell.co.in/api';


export const addToCart = async (
    authToken: string,
    productId: number,
) => {
    console.log('🟡 addToCart CALLED');
    console.log('➡️ Product ID:', productId);

    try {
        const formData = new FormData();

        console.log('🌐 API URL:', `${BASE_URL}/add-to-cart?product_id=${productId}`);

        const response = await axios.post(
            `${BASE_URL}/add-to-cart?product_id=${productId}`,
            formData,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('✅ addToCart SUCCESS');
        console.log('📦 Response:', response.data);

        return response.data;
    } catch (error: any) {
        console.log('❌ addToCart FAILED');
        console.log('🧨 Error:', error?.response?.data || error);
        throw error;
    }
};


export const removeFromCart = async (
    authToken: string,
    productId: number,
) => {
    console.log('🟡 removeFromCart CALLED');
    console.log('➡️ Product ID:', productId);
    const formData = new FormData();
    try {
        const response = await axios.post(
            `${BASE_URL}/remove-from-cart?product_id=${productId}`,
            formData,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('✅ removeFromCart SUCCESS');
        console.log('📦 Response:', response.data);
        return response.data;
    } catch (error: any) {
        console.log('❌ removeFromCart FAILED');
        console.log('🧨 Error:', error?.response?.data || error);
        throw error;
    }
};



export const getCart = async (token: string) => {
    const response = await axios.get(`${BASE_URL}/get-cart`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });

    return response.data;
};
