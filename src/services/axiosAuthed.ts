import {IEndpoint} from '@/config/endpoints';
import axios from 'axios';
import appConfig from '@/config';
import openSnackBar from '@/store/actions/snackbarActions';
import {binary2json} from '@/utils';
import IUser from '@/types/user.type';

export async function axiosAuthed(endpoint: IEndpoint, body?: FormData | any, config?: any) {
  const authorizedBody = new FormData();
  authorizedBody.append('token', localStorage.getItem('token'));
  authorizedBody.append('username', binary2json<IUser>(localStorage.getItem('userObj')).username);
  if (body && body.entries) {
    (body as FormData).forEach((value, key) => {
      if (!authorizedBody.has(key)) {
        authorizedBody.set(key, value);
      }
    });
  } else if (body) {
    Object.keys(body).forEach((key) => {
      if (!authorizedBody.has(key)) {
        authorizedBody.set(key, body[key]);
      }
    });
  }
  const url = !endpoint.url.endsWith('/') ? endpoint.url + '/' : endpoint.url;
  return axios({
    method: endpoint.method,
    url: url,
    baseURL: appConfig.API,
    data: authorizedBody,
    ...config,
  })
      .then((response) => {
        if (response.data.statusCode && response.data.statusCode != 1) {
          throw new Error(`Server error, status code = ${response.data.statusCode}`);
        }
        return response;
      })
      .catch((err) => {
        throw Error(err.message);
      });
}
