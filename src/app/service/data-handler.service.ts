import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from '../model/Task';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskService} from 'src/app/data/dao/impl/TaskService';
import {CategoryService} from 'src/app/data/dao/impl/CategoryService';
import {Priority} from 'src/app/model/Priority';


@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

  private taskArray = new TaskService();
  private categoryArray = new CategoryService();

  constructor() {
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryArray.getAll();
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskArray.getAll();
  }

  updateTask(task: Task): Observable<Task>{
    return this.taskArray.update(task);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskArray.search(category, searchText, status, priority);
  }
}
