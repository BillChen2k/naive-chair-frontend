import axios from 'axios';
import config from '@/config';

const API_URL = config.API;

class AuthService {
  async login(formData: FormData) {
    const response = await axios({
      method: 'post',
      url: API_URL + 'author/signin/',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    },
    );
    console.log(response);
    if (response.status != 200) {
      console.log('Error: ' + response.statusText);
      return;
    }
    // set the token if status is 1
    if (response.data.accessToken && response.data.status == 1) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
  }

  async register(formData: FormData) {
    console.log(formData);
    const response = await axios({
      method: 'post',
      url: API_URL + 'signup/',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    },
    );

    console.log(response);

    if (response.status != 200) {
      console.log('Error: ' + response.statusText);
      return;
    }
    return response.data;
  }

  getCurrentUser() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();
