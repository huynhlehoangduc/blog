import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../@core/interfaces/pagination-response';
import { Post } from '../../../@core/interfaces/post';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public readonly ENDPOINT = 'posts';

  constructor(private readonly httpClient: HttpClient) { }

  list(options = {}): Observable<PaginationResponse<Post>> {
    return this.httpClient.get<PaginationResponse<Post>>(`${environment.apiUrl}/${this.ENDPOINT}`, options);
  }
}
