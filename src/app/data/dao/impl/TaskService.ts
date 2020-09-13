import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskDAO} from 'src/app/data/dao/interface/TaskDAO';
import {Task} from 'src/app/model/Task';
import {Observable, of} from 'rxjs';
import {TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';
import {HttpClient} from '@angular/common/http';
import {Priority} from 'src/app/model/Priority';
import {CommonService} from 'src/app/data/dao/impl/CommonService';
import {CategoryDAO} from 'src/app/data/dao/interface/CategoryDAO';
import {Category} from 'src/app/model/Category';
import {TestData} from 'src/app/data/testData';

// export const TASK_URL_TOKEN = new InjectionToken<string>('url');

export class TaskService implements TaskDAO{

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }

  update(T): Observable<Task> {
    return undefined;
  }

  findAll(): Observable<Task[]> {
    return undefined;
  }

  findById(id: number): Observable<Task> {
    return undefined;
  }

  getTotalCountIntCategory(category: Category): Observable<number> {
    return undefined;
  }

}
