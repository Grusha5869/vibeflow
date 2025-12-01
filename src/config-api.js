/* export const config = {
    Api_Key: '9c216269c789c83fcec15df88b0e0688',
    Api_Url: 'http://ws.audioscrobbler.com/2.0/'
} */
const API_KEYS = {
    API_KEY: import.meta.env.VITE_API_KEY,
    API_URL: import.meta.env.VITE_API_URL,
};

export default API_KEYS;