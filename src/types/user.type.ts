enum UserRole {
  visitor = 'visitor',
  author = 'author',
  referee = 'referee',
}

class IUser {
  private _username: string;
  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  private _realname: string;
  public get realname(): string {
    return this._realname;
  }
  public set realname(value: string) {
    this._realname = value;
  }
  private _email?: string;
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  private _website?: string;
  public get website(): string {
    return this._website;
  }
  public set website(value: string) {
    this._website = value;
  }
  private _bio?: string;
  public get bio(): string {
    return this._bio;
  }
  public set bio(value: string) {
    this._bio = value;
  }
  private _affiliation: string;
  public get affiliation(): string {
    return this._affiliation;
  }
  public set affiliation(value: string) {
    this._affiliation = value;
  }
  private _interest?: string;
  public get interest(): string {
    return this._interest;
  }
  public set interest(value: string) {
    this._interest = value;
  }
  private _signUpDate?: string;
  public get signUpDate(): string {
    return this._signUpDate;
  }
  public set signUpDate(value: string) {
    this._signUpDate = value;
  }
  private _role: UserRole;
  public get role(): UserRole {
    return this._role;
  }
  public set role(value: UserRole) {
    this._role = value;
  }

  public isAuthor(): boolean {
    return this.role === UserRole.author;
  }

  public isReferee(): boolean {
    return this.role === UserRole.referee;
  }

  public isVisitor(): boolean {
    return this.role === UserRole.visitor;
  }

}

export {IUser, UserRole};