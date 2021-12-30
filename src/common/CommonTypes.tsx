import useAuth from '@/services/useAuth';

/**
 * the base type for all users
 */
class UserType {
    private _userName: string;
    public get userName(): string {
      return this._userName;
    }
    public set userName(value: string) {
      this._userName = value;
    }
    private _name: string;
    public get name(): string {
      return this._name;
    }
    public set name(value: string) {
      this._name = value;
    }
    private _affiliation: string;
    public get affiliation(): string {
      return this._affiliation;
    }
    private _userToken: string;
    public get userToken(): string {
      return this._userToken;
    }

    constructor(userName: string, name: string, affiliation: string, userToken: string) {
      this._userToken = userToken;
      this._userName = userName;
      this._name = name;
      this._affiliation = affiliation;
    };
}
