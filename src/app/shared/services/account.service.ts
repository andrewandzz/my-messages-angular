import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Token } from '../interfaces/token.interface';
import md5 from 'crypto-js/md5';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountService {
  private readonly http: HttpClient;
  private readonly url: string;

  public constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.host}/api/accounts`;
  }

  public isLoggedIn(): Observable<boolean> {
    // short circuit
    if (!this.isTokenInStorage()) {
      return of(false);
    }

    const url = `${this.url}/verify-token`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.http.head(url, { headers }).pipe(
      map(_ => true), // if no error, then the token is valid
      catchError(_ => {
        // if error, then the token is invalid
        // remove token from storage to let
        // the short circuit to be done the next time
        this.removeTokenFromStorage();
        return of(false);
      })
    );
  }

  public login(name: string, password: string): Observable<boolean> {
    const url = `${this.url}/login`;
    const body = {
      name,
      password: md5(password).toString()
    };

    return this.http.post<Token>(url, body).pipe(
      map(token => {
        this.removeTokenFromStorage();
        sessionStorage.setItem('token', token.token);
        return true;
      }),
      catchError(_ => {
        // remove token from storage to let
        // the short circuit to be done the next time
        this.removeTokenFromStorage();
        return of(false);
      })
    );
  }

  public logout(): void {
    this.removeTokenFromStorage();
  }

  public register(name: string, password: string): Observable<any> {
    const url = `${this.url}/register`;
    const body = {
      name,
      password
    };

    return this.http.post(url, body);
  }

  private isTokenInStorage(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  private removeTokenFromStorage(): void {
    sessionStorage.removeItem('token');
  }
}
