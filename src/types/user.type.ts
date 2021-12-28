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
