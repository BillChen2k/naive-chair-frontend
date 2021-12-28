import axios from 'axios';
import authHeader from '@/services/authHeader';
import config from '@/config';

const API_URL = config.API;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', {headers: authHeader()});
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', {headers: authHeader()});
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', {headers: authHeader()});
  }
}

export default new UserService();
