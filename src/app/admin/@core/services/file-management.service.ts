import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  readonly API_ENDPOINT = 'file-management';

  constructor(private readonly httpClient: HttpClient) { }

  postImgS3(payload: FormData): Observable<unknown> {
    return this.httpClient.post<string>(`${environment.apiUrl}/${this.API_ENDPOINT}/post-img-s3`, payload);
  }
}
