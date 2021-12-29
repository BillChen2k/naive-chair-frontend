// Reference: https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj
import * as React from 'react';
import {useEffect, useState} from 'react';
import config from '@/config';
import {IEndpoint} from '@/config/endpoints';
import axios from 'axios';
import useAuth from '@/services/useAuth';
import {useDispatch} from 'react-redux';
import openSnackBar from '@/store/actions/snackbarActions';

function useAxios(endpoint: IEndpoint, body?: FormData, headers?: any) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const dispatch = useDispatch();
  if (!auth.isAuthenticated) {
    dispatch(openSnackBar('User not authenticated.', 'error'));
    return {response, error, loading};
  }
  let authorizedBody = body;
  if (!authorizedBody) {
    authorizedBody = new FormData();
  }
  authorizedBody.append('token', auth.token);
  authorizedBody.append('username', auth.userObj.username);
  const url = !endpoint.url.endsWith('/') ? endpoint.url + '/' : endpoint.url;
  const fetchData = () => {
    // @ts-ignore
    axios({
      method: endpoint.method,
      url: url,
      baseURL: config.API,
      data: authorizedBody,
      headers: {...headers},
    })
        .then((res) => {
          console.log(res);
          if (res.data.statusCode == 1) {
            setResponse(res.data);
          } else {
            const errMsg = `Server error. Status code: ${res.data.statusCode}`;
            dispatch(openSnackBar(errMsg, 'error'));
            throw Error(errMsg);
          }
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
  };

  useEffect(() => {
    fetchData();
  }, [endpoint.url, endpoint.method, body, headers]);

  return {response, error, loading};
};

export default useAxios;
