import axios from 'axios';

const PIXABEY_API_KEY= '23744407-6e41977eb223c860dbad454a0';

const axiosInstance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    timeout: 1000,
});

async function getImage(query,page) {    
    const response = await axiosInstance.get(`?key=${PIXABEY_API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`);
    return response.data.hits;
      
}

export{ getImage};

