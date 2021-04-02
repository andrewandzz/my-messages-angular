import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditMessage } from '../interfaces/edit-message.interface';
import { Message } from '../interfaces/message.interface';
import { MessagesData } from '../interfaces/messages-data.interface';
import { NewMessage } from '../interfaces/new-message.interface';

@Injectable()
export class MessageService {
  private readonly http: HttpClient;
  private readonly headers: HttpHeaders;
  private readonly url: string;

  constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    this.url = `${environment.host}/api/messages`;
  }

  public get(count: number, fromId?: number): Observable<MessagesData> {
    const url = (fromId !== null && fromId !== undefined) ?
      `${this.url}?from-id=${fromId}&count=${count}` :
      `${this.url}?count=${count}`;

    return this.http.get<MessagesData>(url, { headers: this.headers });
  }

  public add(newMessage: NewMessage): Observable<Message> {
    const formData = new FormData();
    formData.append('text', newMessage.text);

    if (newMessage.picture !== null) {
      formData.append('picture', newMessage.picture);
    }

    if (newMessage.file !== null) {
      formData.append('file', newMessage.file);
    }

    if (newMessage.stickerId !== null) {
      formData.append('stickerId', newMessage.stickerId.toString());
    }

    return this.http.post<Message>(this.url, formData, { headers: this.headers });
  }

  public edit(message: EditMessage): Observable<Message> {
    const url = `${this.url}/${message.id}`;

    const formData = new FormData();
    formData.append('text', message.text);

    if (message.picture !== null) {
      formData.append('picture', message.picture);
    }

    if (message.file !== null) {
      formData.append('file', message.file);
    }

    return this.http.put<Message>(url, formData, { headers: this.headers });
  }

  public remove(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }
}
