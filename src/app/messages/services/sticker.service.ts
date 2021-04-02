import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StickerInfo } from '../interfaces/sticker-info.interface';

@Injectable()
export class StickerService {
  private readonly http: HttpClient;
  private readonly url: string;
  private readonly headers: HttpHeaders;

  public constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.host}/api/stickers`;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  public getAll(): Observable<StickerInfo[]> {
    return this.http.get<StickerInfo[]>(this.url, { headers: this.headers });
  }
}
