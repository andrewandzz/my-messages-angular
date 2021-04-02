import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly http: HttpClient;
  private readonly headers: HttpHeaders;
  private readonly url: string;

  public constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.url = `${environment.host}/api/resources`;
  }

  public downloadPicture(id: number, name: string): void {
    const url = `${this.url}/pictures/${id}`;
    this.downloadResource(url, name);
  }

  public downloadFile(id: number, name: string): void {
    const url = `${this.url}/files/${id}`;
    this.downloadResource(url, name);
  }

  public getSticker(id: number, name: string): Observable<File> {
    const url = `${this.url}/stickers/${id}`;
    return this.getResourceAsFile(url, name);
  }

  // public getAllStickers(): Observable<string[]> {
  //   // const url = `${this.url}/stickers/`
  //   return of([
  //     'apricot.png',
  //     'calendula.png',
  //     'chamomile.png',
  //     'cloud.png',
  //     'flowers.png',
  //     'heart.png',
  //     'hills.png',
  //     'mallow.png',
  //     'mushroom.png',
  //     'rainbow.png',
  //     'sun.png',
  //     'tree.png'
  //   ]);
  // }

  public getPicture(id: number, name: string): Observable<File> {
    const url = `${this.url}/pictures/${id}`;
    return this.getResourceAsFile(url, name);
  }

  public getFile(id: number, name: string): Observable<File> {
    const url = `${this.url}/files/${id}`;
    return this.getResourceAsFile(url, name);
  }

  private downloadResource(url: string, name: string): void {
    this.getResourceAsFile(url, name)
      .subscribe(file => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(file);
        a.download = name;
        a.click();
      })
  }

  private getResourceAsFile(url: string, name: string): Observable<File> {
    return this.http.get(url, { headers: this.headers, responseType: 'blob' })
      .pipe(
        map(response => {
          const blob = new Blob([response]);
          return new File([blob], name);
        })
      );
  }
}
