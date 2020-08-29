import { Injectable } from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/testData';
import {Task} from '../model/Task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  categorySubject = new BehaviorSubject<Category[]>(TestData.categories);
  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);

  constructor() { }

  // getCategories(): void {
  //   const categories = TestData.categories;
  //   this.categorySubject.next(categories);
  // }

  // getTasks(): Task[]{
  //   return TestData.tasks;
  // }


  // rxJS
  // fillTasks(): void {
  //   //  this.tasksSubject.next(TestData.tasks);
  //   // }

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
