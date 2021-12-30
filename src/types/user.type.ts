import IConference from '@/types/conference.type';

export function parseUser(responseData: any) : IUser {
  const userObj: IUser = {
    username: responseData.username || 'undefined',
    role: responseData.role || 'undefined',
    realname: responseData.realname,
    email: responseData.email,
    affiliation: responseData.affilication, // Typo in the backend
    interest: responseData.interest,
    bio: responseData.bio,
    website: responseData.website,
    signUpDate: responseData.signUpDate,
  };
  return userObj;
}


interface IUser {
  username?: string;
  realname?: string;
  email?: string;
  website?: string;
  bio?: string;
  affiliation?: string;
  interest?: string;
  signUpDate?: string;
  role: 'author' | 'referee';
}

export default IUser;
