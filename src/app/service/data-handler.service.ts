import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/testData';
import {Task} from '../model/Task';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new Subject<Task[]>();

  constructor() { }

  getCategories(): Category[] {
    return TestData.categories;
  }

  // getTasks(): Task[]{
  //   return TestData.tasks;
  // }

  // rxJS
  fillTasks(): void {
    this.tasksSubject.next(TestData.tasks);
  }

  // getTasksByCategory(category: Category): Task[] {
  //   const tasks = TestData.tasks.filter(task => task.category === category);
  //   // console.log(tasks);
  //   return tasks;
  // }

  // rxJS
  fillTasksByCategory(category: Category): void {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.tasksSubject.next(tasks);
    // console.log(tasks);
  }

}
