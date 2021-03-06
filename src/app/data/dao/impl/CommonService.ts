import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class CommonService<T> {

  private readonly url: string;

  constructor(url: string,
              private httpClient: HttpClient
  ) {
    this.url = url;
  }

  add(abj: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', abj);
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/delete/id/' + id);
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/id/' + id);
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url + '/all');
  }

  update(obj: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/update', obj);
  }
}
