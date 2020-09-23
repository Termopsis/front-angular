import {Component, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {zip} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];
  private categoryMap = new Map<Category,number>();

  private selectedCategory: Category;

  //Фильтры
  private searchTaskText = '';
  private searchCategoryText = '';
  private statusFilter: boolean;
  private priorityFilter: Priority;
  private showStat: boolean;

  //Статистика по задачам
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;

  constructor(
    private dataHandlerService: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.fillCategories();
    this.onSelectCategory(null);
  }

  public onAddTask(task: Task) {
    this.dataHandlerService.addTask(task).pipe(// сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
          // .. и считаем кол-во задач в категории с учетом добавленной задачи
          return this.dataHandlerService.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count}); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
          }));
        }
      )).subscribe(result => {

      const t = result.t as Task;

      // если указана категория - обновляем счетчик для соотв. категории
      // чтобы не обновлять весь список - обновим точечно
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }

      this.updateTasksAndStat();

    });
  }

  public onAddCategory(title: string) {
    this.dataHandlerService.addCategory(title).subscribe(result => {
      this.fillCategories();
    });
  }

  public onUpdateTask(task: Task) {
    this.dataHandlerService.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStat();
    });
  }

  public updateTasks() {
    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter)
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  public onDeleteTask(task: Task) {
    this.dataHandlerService.deleteTask(task.id).pipe(
      concatMap(task => {
          return this.dataHandlerService.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count});
          }));
        }
      )).subscribe(result => {

      const t = result.t as Task;

      // если указана категория - обновляем счетчик для соотв. категории
      // чтобы не обновлять весь список, обновим только одну
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }

      this.updateTasksAndStat();

    });

  }

  public onUpdateCategory(category: Category): void {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  private updateCategories() {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  public onDeleteCategory(category: Category) {
    this.dataHandlerService.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null;
      this.categoryMap.delete(category); // Удаление категории из map
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });
  }

  public onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  private fillCategories() {

    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    // для каждой категории посчитать невыполненные задачи
    this.categories.forEach(cat => {
      this.dataHandlerService.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });

  }

  private onSearchCategory(title: string): void {
    this.searchCategoryText = title;

    this.dataHandlerService.searchCategory(title).subscribe(categories => {
      this.categories = categories;
      this.fillCategories();
    });
  }

  public onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  public onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  public onFilterTaskByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

//  Статистика
  private updateTasksAndStat() {
    this.updateTasks();
    this.updateStat();
  }

  private updateStat() {
    zip(
      this.dataHandlerService.getTotalCountInCategory(this.selectedCategory),
      this.dataHandlerService.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandlerService.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandlerService.getUncompletedTotalCount())

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
  }

  private toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

}
