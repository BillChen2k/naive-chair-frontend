import {IUser, UserRole} from '@/types/user.type';
import {Method} from 'axios';

export interface IEndpoint {
  url: string;
  method: Method;
}

export type IEndpoints = {
  [key in UserRole]: {
    [key: string]: IEndpoint;
  };
};

const endpoints: IEndpoints = {
  author: {
    signup: {url: '/author/signup', method: 'POST'},
    signin: {url: '/author/signin', method: 'POST'},
    addPaper: {url: '/author/addPaper', method: 'POST'},
    getPaperList: {url: '/author/getPaperList', method: 'POST'},
    getConferenceList: {url: '/author/getConferenceList', method: 'POST'},
    changePaper: {url: '/author/changePaper', method: 'POST'},
  },
  referee: {
    signin: {url: '/referee/signin', method: 'POST'},
    getPaperList: {url: '/referee/getPaperList', method: 'POST'},
    changePaperOpinion: {url: '/referee/changePaperOpinion', method: 'POST'},
    getPaper: {url: '/referee/getPaper', method: 'POST'},
    createConference: {url: '/referee/createConference', method: 'POST'},
    getConferenceList: {url: '/referee/getConferenceList', method: 'POST'},
    removeConferences: {url: '/referee/removeConferences', method: 'POST'},
  },
  visitor: undefined,
};

export default endpoints;
