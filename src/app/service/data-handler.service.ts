import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from '../model/Task';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskService} from 'src/app/data/dao/impl/TaskService';
import {CategoryService} from 'src/app/data/dao/impl/CategoryService';
import {Priority} from 'src/app/model/Priority';
import {PriorityService} from 'src/app/data/dao/impl/PriorityService';


@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

  private taskArray = new TaskService();
  private categoryArray = new CategoryService();
  private priorityArray = new PriorityService();

  constructor() {
  }

  addCategory(title: string): Observable<Category>{
    return this.categoryArray.add(new Category(null,title));
  }

  addTask(task: Task): Observable<Task>{
    return this.taskArray.add(task);
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

  updateCategory(category: Category): Observable<Category>{
    return this.categoryArray.update(category);
  }

  searchCategory(title: string): Observable<Category[]>{
    return this.categoryArray.search(title);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskArray.search(category, searchText, status, priority);
  }

  deleteTask(id: number): Observable<Task>{
    return this.taskArray.delete(id);
  }
  deleteCategory(id: number): Observable<Category>{
    return this.categoryArray.delete(id);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskArray.getTotalCountInCategory(category);
  }

  //Приоритеты -------------------------------
  getAllPriorities(): Observable<Priority[]> {
    return this.priorityArray.getAll();
  }

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityArray.add(priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityArray.delete(id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityArray.update(priority);
  }

}
