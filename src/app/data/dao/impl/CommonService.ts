import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TestData} from 'src/app/data/testData';
import {Task} from 'src/app/model/Task';

// @Injectable({
//   providedIn: 'root'
// })
export class CommonService<T> {

  //private readonly url: string;

  // constructor(url: string,
  //             private httpClient: HttpClient
  // ) {
  //   this.url = url;
  // }

  // add(abj: T): Observable<T> {
  //   // return this.httpClient.post<T>(this.url + '/add', abj);
  // }
  //
  // delete(id: number): Observable<T> {
  //   // return this.httpClient.delete<T>(this.url + '/delete/' + id);
  // }
  //
  // findById(id: number): Observable<T> {
  //   // return this.httpClient.get<T>(this.url + '/id/' + id);
  // }
  //
  // findAll(): Observable<T[]> {
  //   //return this.httpClient.get<T[]>(this.url + '/all');
  //   // return of(TestData.tasks);
  // }
  //
  // update(obj: T): Observable<T> {
  //   // return this.httpClient.put<T>(this.url + '/update', obj);
  // }

}
