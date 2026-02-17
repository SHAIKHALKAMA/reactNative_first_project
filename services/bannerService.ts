import { apiGet } from './api';

export const getBanners = async () => {
    return await apiGet('/banner');
};


export const getServices = async () => {
    return await apiGet('/service');
};


export const getProducts = async () => {
    return await apiGet('/product');
};

export const getProductDetails = async (id: string) => {
    return await apiGet(`/product-detail?product_id=${id}`);
};

export const getProfile = async () => {
    return await apiGet(`/profile`);
};