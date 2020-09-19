// @ts-ignore
import {Component, OnInit} from '@angular/core';
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
    //this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
  }

  public onSelectCategory(category){

    this.selectedCategory = category;
    console.log(category);

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
    //console.log(task);

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

}
