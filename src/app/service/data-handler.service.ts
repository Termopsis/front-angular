import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from '../model/Task';
import {BehaviorSubject, Observable} from 'rxjs';
import {TaskService} from 'src/app/data/dao/impl/TaskService';
import {CategoryService} from 'src/app/data/dao/impl/CategoryService';


@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
    categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);
    private taskArray = new TaskService();
    private categoryArray = new CategoryService();

    constructor() {
        //this.fillTasks();
    }

    fillCategories() {
        return TestData.categories;
    }

    // fillTasks() {
    //     this.tasksSubject.next(TestData.tasks);
    // }
    //
    fillTasksByCategory(category: Category) {
        const tasks = TestData.tasks.filter(task => task.category === category);
        this.tasksSubject.next(tasks);
    }

    getAllTasks(): Observable<Task[]>{
      return this.taskArray.getAll();
    }

    getAllCategories(): Observable<Category[]>{
      return this.categoryArray.getAll();
    }

}
