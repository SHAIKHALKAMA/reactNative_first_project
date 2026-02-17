import axios from 'axios';

const BASE_URL = 'https://app.swimwell.co.in/api';

export const addPool = async (
    token: string,
    poolData: any
) => {
    const formData = new FormData();

    formData.append('name', poolData.name);
    formData.append('length', poolData.length);
    formData.append('width', poolData.width);
    formData.append('depth', poolData.depth);
    formData.append('mode_in', poolData.mode_in);
    formData.append('address_id', poolData.address_id);
    formData.append('description', poolData.description);

    if (poolData.image) {
        formData.append('image', {
            uri: poolData.image,
            name: 'pool.jpg',
            type: 'image/jpeg',
        } as any);
    }

    const response = await axios.post(
        `${BASE_URL}/add-pool`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
};
