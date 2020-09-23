import {TaskDAO} from 'src/app/data/dao/interface/TaskDAO';
import {Task} from 'src/app/model/Task';
import {Observable, of} from 'rxjs';
import {Priority} from 'src/app/model/Priority';
import {Category} from 'src/app/model/Category';
import {TestData} from 'src/app/data/testData';

export class TaskService implements TaskDAO{

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  add(task: Task): Observable<Task> {

    if (task.id === null || task.id === 0){
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);

    return of(task);
  }

  //Пока не подключены к базе делаем так
  private getLastIdTask(): number{
    return Math.max.apply(Math, TestData.tasks.map(task => task.id))+1;
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

    return of(taskTmp);
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
    return of(this.searchTasks(category,searchText,status,priority));
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[]{

    let allTasks = TestData.tasks;

    if (status != null){
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null){
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null){
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(task => task.title.toUpperCase().includes(searchText.toUpperCase()));
    }

    return allTasks;
  }

  update(task: Task): Observable<Task> {

    const taskTmp = TestData.tasks.find(t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp),1,task);

    return of(task);
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
