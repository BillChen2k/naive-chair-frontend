import {Method} from 'axios';

export interface IEndpoint {
  url: string;
  method: Method;
}

export type IEndpoints = {
  [key in 'author' | 'referee']: {
    [key: string] : IEndpoint
  };
};

const endpoints: IEndpoints = {
  author: {
    signup: {url: '/author/signup', method: 'POST'},
    signin: {url: '/author/signin', method: 'POST'},
    addPaper: {url: '/author/addPaper', method: 'POST'},
    removePaper: {url: '/author/removePaper', method: 'POST'},
    getPaperList: {url: '/author/getPaperList', method: 'POST'},
    getPaper: {url: '/author/getPaper', method: 'POST'},
    getConferenceList: {url: '/author/getConferenceList', method: 'POST'},
    changePaper: {url: '/author/changePaper', method: 'POST'},
    getUserInfo: {url: '/getAuthorInfo', method: 'POST'},
    changeInfo: {url: '/author/changeInfo', method: 'POST'},
    getResearcherList: {url: '/author/getResearcherList', method: 'POST'},
    changeResearcherInfo: {url: '/author/changeResearcherInfo', method: 'POST'},
    addResearcher: {url: '/author/addResearcher', method: 'POST'},
    removeResearcher: {url: '/author/removeResearcher', method: 'POST'},
  },
  referee: {
    signin: {url: '/referee/signin', method: 'POST'},
    getPaperList: {url: '/referee/getPaperList', method: 'POST'},
    changePaperOpinion: {url: '/referee/changePaperOpinion', method: 'POST'},
    getPaper: {url: '/referee/getPaper', method: 'POST'},
    createConference: {url: '/referee/createConference', method: 'POST'},
    getConferenceList: {url: '/referee/getConferenceList', method: 'POST'},
    removeConferences: {url: '/referee/removeConferences', method: 'POST'},
    changeInfo: {url: '/referee/changeInfo', method: 'POST'},
    changeConferenceInfo: {url: '/referee/changeConferenceInfo', method: 'POST'},
  },
};

export default endpoints;
