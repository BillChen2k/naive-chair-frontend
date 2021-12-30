/**
 * useAuth hooks, used as a replacement for authService.tsx.
 *
 * See concepts at: https://usehooks.com/useAuth/
 *
 * Inside the LocalStorage:
 *   - userObj: base64 encoded IUser object
 *   - token
 *   Best not to access or modify the LocalStorage about auth anywhere except this file.
 *
 * Inside the React Context:
 *   - userObj: JSON IUser object
 *   - token
 *   - isAuthenticated
 *   - [functions about authentication]
 */
import * as React from 'react';
import {createContext, useContext, useState} from 'react';
import axios from 'axios';
import config from '@/config';
import endpoints, {IEndpoint} from '@/config/endpoints';
import IUser from '@/types/user.type';
import {binary2json, json2Binary} from '@/utils';
import {Navigate} from 'react-router-dom';
import useAxios from '@/services/useAxios';

const api = config.API;

const AuthContext = createContext<
  Partial<ReturnType<Awaited<typeof authContextValue>>>
  >({});

function initAuth() {
  const userObj = binary2json<IUser>(localStorage.getItem('userObj'));
  const token = localStorage.getItem('token');
  // todo: Fetch full userinfo from the server
  if (token && userObj) {
    const isAuthenticated = true;
    return {userObj, token, isAuthenticated};
  } else {
    const isAuthenticated = false;
    return {userObj, token, isAuthenticated};
  }
}

function authContextValue() {
  const initContext = initAuth();
  const [userObj, setUserObj] = useState<IUser>(initContext.userObj);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initContext.isAuthenticated);
  const [token, setToken] = useState<string>(initContext.token);
  const signIn = async (formData: FormData) =>{
    let endpoint: IEndpoint;
    const role = formData.get('role');
    switch (role) {
      case 'author':
        endpoint = endpoints.author.signin;
        break;
      case 'referee':
        endpoint = endpoints.referee.signin;
        break;
    }
    const response = await axios.post(api + endpoint.url + '/', formData);
    console.log(response);
    if (response.status != 200) {
      console.log('Error: ' + response.statusText);
      return;
    }
    // set the token if status is 1
    if (response.data.token && response.data.statusCode == 1) {
      const userObj: IUser = {
        username: formData.get('username') as string,
        role: formData.get('role') as ('author' | 'referee'),
        realname: response.data.realname,
        email: response.data.email,
        affiliation: response.data.affilication, // Typo in the backend
        interest: response.data.interest,
        bio: response.data.bio,
        website: response.data.website,
        signUpDate: response.data.signUpDate,
      };
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userObj', json2Binary(userObj));
      setUserObj(userObj);
      setIsAuthenticated(true);
      setToken(response.data.token);
    }
    return response.data;
  };

  const signUp = async (formData: FormData) => {
    console.log(formData);
    const response = await axios({
      method: 'post',
      url: api + endpoints.author.signup.url,
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
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userObj');
    setIsAuthenticated(false);
    setUserObj(null);
    setToken('');
  };

  type IRole = 'author' | 'referee' | 'visitor';
  /**
   * Add this to the top of the component to access control.
   * @param accessibleRoles: Array of roles that can access this component.
   * @example `{auth.accessControl(['referee'])}`
   */
  const accessControl = (accessibleRoles: IRole[]) => {
    const userRole = userObj ? userObj.role : 'visitor';
    if (!accessibleRoles.includes(userRole)) {
      return <Navigate to={'/403'} />;
    }
    return null;
  };

  return {
    userObj,
    isAuthenticated,
    token,
    signIn,
    signUp,
    signOut,
    accessControl,
    forbidden403: <Navigate to={'/403'} />,
  };
}

type AuthProviderProps = {
  children: React.ReactNode;
}
export function AuthProvider({children}: AuthProviderProps) {
  const auth = authContextValue();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
