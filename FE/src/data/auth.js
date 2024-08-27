const API_URL = import.meta.env.VITE_APP_NEXTGAMEFINDER_API_URL;

if(!API_URL) throw new Error('API_URL is not defined, please check your .env file');

const baseUrl = `${API_URL}/auth`;

export const signup = async(formData) => {
    const res = await fetch(baseUrl + '/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        if (!errorData.error) {
            throw new Error('Something went wrong with your signup!');
        }
        throw new Error(errorData.error);
    }
    const data = await res.json();
    return data;
}