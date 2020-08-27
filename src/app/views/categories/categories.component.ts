import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Line, printLine} from 'tslint/lib/verify/lines';
import {Task} from '../../model/Task';
import {TasksComponent} from '../tasks/tasks.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private dataHandler: DataHandlerService) {
  }

  // метод вызывается авто после иниц компонента
  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories();
    // console.log(this.categories);
  }

  showTasksByCategory(category: Category): void {
    this.dataHandler.fillTasksByCategory(category);
    // console.log(category);
  }
}
