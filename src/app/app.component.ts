import {Component, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Todo';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  showStat: boolean;

  //Статистика по задачам
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;

  selectedCategory: Category;

  private searchTaskText = '';
  private searchCategoryText = '';
  private statusFilter: boolean;
  private priorityFilter: Priority;

  constructor(
    private dataHandlerService: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.onSelectCategory(null);
  }

  public onAddTask(task: Task) {
    this.dataHandlerService.addTask(task).subscribe(result => {
      this.updateTasksAndStat();
    });
  }

  public onUpdateTask(task: Task) {
    this.updateTasksAndStat();
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
    this.dataHandlerService.deleteTask(task.id).subscribe(tas => {
      this.updateTasksAndStat();
    });

  }


  public onAddCategory(title: string) {
    this.dataHandlerService.addCategory(title).subscribe(result => {
      this.updateCategories();
    });
  }

  public onUpdateCategory(category: Category) {
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
      this.onSearchCategory(this.searchCategoryText);
    });
  }


  public onSelectCategory(category: Category) {

    this.selectedCategory = category;
    this.updateTasksAndStat();

  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;

    this.dataHandlerService.searchCategory(title).subscribe(categories => {
      this.categories = categories;
    });
  }


  public onFilterTaskByStatus(status: boolean) {
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
