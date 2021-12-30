import axios from 'axios';
import config from '@/config';

import {UserRole, IUser} from '@/types/user.type';

const API_URL = config.API;

class PaperService {
  static async submitPaper(formData: FormData, userObj: IUser, token: string) {
    formData.append('username', userObj.username);
    formData.append('token', token);
    const response = await axios.post(API_URL + '/paper/submit/', formData);
    return response.data;
  };
}

export default PaperService;
