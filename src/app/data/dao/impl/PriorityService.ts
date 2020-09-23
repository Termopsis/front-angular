import {Injectable, InjectionToken} from '@angular/core';
import {PriorityDAO} from 'src/app/data/dao/interface/PriorityDAO';
import {Priority} from 'src/app/model/Priority';
import {Observable, of} from 'rxjs';
import {TestData} from 'src/app/data/testData';

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class PriorityService implements PriorityDAO{

  add(priority: Priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }
    TestData.priorities.push(priority);

    return of(priority);
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });

    const tmpPriority = TestData.priorities.find(t => t.id === id); // удаляем по id
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);

    return of(tmpPriority);
  }

  get(id: number): Observable<Priority> {
    return of(TestData.priorities.find(priority => priority.id === id));;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(priority: Priority): Observable<Priority> {
    const tmp = TestData.priorities.find(t => t.id === priority.id); // обновляем по id
    TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, priority);

    return of(priority);
  }

  findAll(): Observable<Priority[]> {
    return undefined;
  }

  findById(id: number): Observable<Priority> {
    return undefined;
  }

  search(title: string): Observable<Priority[]> {
    return undefined;
  }

  private getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(c => c.id)) + 1;
  }

}
