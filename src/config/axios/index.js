import axios from 'axios';
import enviroment from '../environment';

const instance = axios.create({
  baseURL: enviroment.url,
});

export default instance;
