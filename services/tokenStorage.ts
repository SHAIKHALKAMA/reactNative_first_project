import AsyncStorage from '@react-native-async-storage/async-storage';

const GUEST_TOKEN_KEY = 'GUEST_TOKEN';
const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

export const saveGuestToken = async (token: string) => {
    if (!token) return;
    await AsyncStorage.setItem(GUEST_TOKEN_KEY, token);
};

export const getGuestToken = async () => {
    return await AsyncStorage.getItem(GUEST_TOKEN_KEY);
};

export const saveAuthToken = async (token: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = async () => {
    return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearGuestToken = async () => {
    await AsyncStorage.removeItem(GUEST_TOKEN_KEY);
};

export const clearAuthToken = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};