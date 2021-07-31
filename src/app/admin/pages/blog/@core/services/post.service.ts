import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Post } from '../interfaces/post';
import { PaginationResponse } from '../../../../../@core/interfaces/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public readonly ENDPOINT = 'posts';

  constructor(private readonly httpClient: HttpClient) {
  }

  list(options = {}): Observable<PaginationResponse<Post>> {
    return this.httpClient.get<PaginationResponse<Post>>(`${environment.apiUrl}/${this.ENDPOINT}`, options);
  }

  delete(id: string): Observable<unknown> {
    return this.httpClient.delete(`${environment.apiUrl}/${this.ENDPOINT}/${id}`);
  }

  create(payload, options = {}): Observable<Post> {
    return this.httpClient.post(`${environment.apiUrl}/${this.ENDPOINT}`, payload, options)
  }

  update(id: string, payload, options = {}): Observable<Post> {
    return this.httpClient.put(`${environment.apiUrl}/${this.ENDPOINT}/${id}`, payload, options)
  }

  getOne(id: string): Observable<Post> {
    return this.httpClient.get(`${environment.apiUrl}/${this.ENDPOINT}/${id}`);
  }
}
