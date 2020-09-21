// @ts-ignore
import {Component, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Todo';
  tasks: Task[];
  categories: Category[];

  selectedCategory: Category;

  constructor(
    private dataHandlerService: DataHandlerService,
  ) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
  }

  public onSelectCategory(category){

    this.selectedCategory = category;

    this.dataHandlerService.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  public onUpdateTask(task: Task){

    this.dataHandlerService.updateTask(task).subscribe(() =>{
      this.dataHandlerService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });

  }

  public onDeleteTask(task: Task){

    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.dataHandlerService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });

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

}
