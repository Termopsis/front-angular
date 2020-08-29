import {Component, Input, OnInit} from '@angular/core';
// import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Line, printLine} from 'tslint/lib/verify/lines';
import {Task} from '../../model/Task';
import {TasksComponent} from '../tasks/tasks.component';
import {CategoryServiceService} from 'src/app/data/dao/impl/category-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input('categories')
  set setCategories(categories: Category[]){
    this.categories = categories;
  }

  categories: Category[];
  selectedCategory: Category;
  constructor(private categoryService: CategoryServiceService) {
  }

  // метод вызывается авто после иниц компонента
  ngOnInit(): void {
    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
    });
    console.log(this.categories);
    console.log('1');

    // this.dataHandler.categorySubject.subscribe(categories => this.categories = categories);
    // this.categories = this.dataHandler.getCategories();
    // console.log(this.categories);
  }

  showTasksByCategory(category: Category): void {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
    console.log('2');
    // this.dataHandler.fillTasksByCategory(category);
    // console.log(category);
  }
}
