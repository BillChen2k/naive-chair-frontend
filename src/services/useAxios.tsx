// Reference: https://dev.to/ms_yogii/useaxios-a-simple-custom-hook-for-calling-apis-using-axios-2dkj

import config from '@/config';
import {useEffect, useState} from 'react';
import endpoints, {IEndpoint} from '@/config/endpoints';
import axios from 'axios';
import useAuth from '@/services/useAuth';

const useAxios = (endpoint: IEndpoint, body?: FormData, headers?: any) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  if (!body) {
    body = new FormData();
  }
  body.append('token', auth.token);
  body.append('username', auth.userObj.username);

  const fetchData = () => {
    // @ts-ignore
    axios({
      method: endpoint.method,
      url: endpoint.url,
      baseURL: config.API,
      data: body,
      headers: {'Content-Type': 'multipart/form-data',
        ...headers},
    })
        .then((res) => {
          setResponse(res.data);
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
  }, [endpoint, headers]);
  return {response, error, loading};
};

export default useAxios;
//
// export default function useAxios(endpoint: IEndpoint) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const auth = useAuth();
//   const call = async (options?: any) => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (options.data) {
//         options.data = (options.data as FormData).append('token', auth.token);
//       }
//       const response = await axios({
//         ...endpoint,
//         ...options,
//         baseURL: config.API,
//       });
//       if (response.status != 200 || response.data.statusCode != 1) {
//         throw new Error('Server error.');
//       }
//       setLoading(false);
//       return response.data;
//     } catch (err) {
//       setLoading(false);
//       setError(err.message);
//     }
//   };
//
//   return {call, loading, error};
// }
