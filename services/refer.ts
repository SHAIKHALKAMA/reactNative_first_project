import axios from "axios";

const BASE_URL = 'https://app.swimwell.co.in/api';

export const addReferral = async (
    token: string,
    referralData: any
) => {
    const formData = new FormData();

    formData.append('name', referralData.name);
    formData.append('phone', referralData.mobile);
    formData.append('location', referralData.location);
    formData.append('notes', referralData.note);
    const response = await axios.post(
        `${BASE_URL}/referal-privileges`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};
