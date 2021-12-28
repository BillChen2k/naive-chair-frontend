import axios from 'axios';
import config from '@/config';

const API_URL = config.API;

class AuthService {
  async login(formData: FormData) {
    let endpoint = '';
    const role = formData.get('role');
    switch (role) {
      case 'author':
        endpoint = 'author/signin/';
        break;
      case 'referee':
        endpoint = 'referee/signin/';
        break;
    }
    const response = await axios({
      method: 'post',
      url: API_URL + endpoint,
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
    if (response.data.token && response.data.statusCode == 1) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', formData.get('username') as string);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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

  getCurrentUserToken() {
    return localStorage.getItem('token');
  }

  getCurrentUserName() {
    return localStorage.getItem('username');
  }
}

export default new AuthService();
