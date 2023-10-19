import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
    baseURL: 'https://intern-task4-server.onrender.com'
})

customFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  });

  export default customFetch