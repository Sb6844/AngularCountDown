import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


const USER_KEY = 'auth-user';
const TOKEN_KEY = 'token'


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }



  clean(): void {
    window.sessionStorage.clear();
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
    this.saveToken(user);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken()
  {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }


  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user)
    {
      return jwtDecode(user);
    }

    return {};
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user)
    {
      return true;
    }
    return false;
  }
}
