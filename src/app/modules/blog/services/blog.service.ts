import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostInterface} from '../interfaces/post';
import {catchError} from 'rxjs/operators';

const endpoint = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private httpclient: HttpClient,
  ) { }

  getPosts(): Observable<HttpResponse<PostInterface[]>> {
    return this.httpclient.get<PostInterface[]>(`${endpoint}/posts`, {
      observe: 'response'
    });
  }

  addPost(post: PostInterface): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(post);
    console.log(body);
    return this.httpclient.post(`${endpoint}/posts`, body, {
      headers
    });
  }

  getPost(id: number): Observable<HttpResponse<PostInterface>> {
    return this.httpclient.get<PostInterface>(`${endpoint}/posts/${id}`, {
      observe: 'response'
    });
  }
}
