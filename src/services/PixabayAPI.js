import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33947023-c15fa4d03e325678c88d2d925';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});
// Запрос на сервер
 
function fetchhPhoto (value, page = 1)  {
  return instance({ params: { q: `${value}`, page: `${page}` } })
    .then(function (pictures) {
      console.log(pictures);
      if (pictures.status === 200) {
        if (pictures.data.total===0) {
          return Promise.reject(
            new Error(`Не найдено картинок с названием ${value}`)
          );
        }
        return pictures;
      }
      
    }
  )
};

const api = { fetchhPhoto };
export default api;