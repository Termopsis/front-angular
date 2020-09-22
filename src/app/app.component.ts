// @ts-ignore
import {Component, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';

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

  selectedCategory: Category;

  private searchTaskText = '';
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

  public onSelectCategory(category){

    this.selectedCategory = category;

    this.updateTasks();

  }

  public onUpdateTask(task: Task){

    this.updateTasks();
    // this.dataHandlerService.updateTask(task).subscribe(() =>{
    //   this.dataHandlerService.searchTasks(
    //     this.selectedCategory,
    //     null,
    //     null,
    //     null
    //   ).subscribe(tasks => {
    //     this.tasks = tasks;
    //   });
    // });

  }

  public onDeleteTask(task: Task){

    this.dataHandlerService.deleteTask(task.id).subscribe(tas =>{
      this.onSelectCategory(this.selectedCategory);
    })

  }

  public onUpdateCategory(category: Category){
    this.dataHandlerService.updateCategory(category).subscribe(() =>{
      this.onSelectCategory(this.selectedCategory);
    })
  }

  public onDeleteCategory(category: Category){
    this.dataHandlerService.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  public onFilterTaskByStatus(status: boolean){
    this.statusFilter = status;
    this.updateTasks();
  }

  public onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  public onFilterTaskByPriority(priority: Priority){
    this.priorityFilter = priority;
    this.updateTasks();
  }

  public updateTasks(){

    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter)
      .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

  }

}
