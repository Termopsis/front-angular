import {Component, Input, OnInit} from '@angular/core';
// import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Line, printLine} from 'tslint/lib/verify/lines';
import {Task} from '../../model/Task';
import {TasksComponent} from '../tasks/tasks.component';
import {CategoryService} from 'src/app/data/dao/impl/CategoryService';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';
import {TestData} from 'src/app/data/testData';
import {TaskService} from 'src/app/data/dao/impl/TaskService';
import {TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  // @Input('categories')
  // set setCategories(categories: Category[]){
  //   this.categories = categories;
  //   console.log(categories);
  //
  // }

  categories: Category[];
  selectedCategory: Category;
  taskSearchValues: TaskSearchValues;

  constructor(private categoryService: CategoryService,
              private taskService: TaskService) {
  }

  // метод вызывается авто после иниц компонента
  ngOnInit(): void {
    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
      // console.log(result);
    });
    // console.log(this.categories);
    // console.log('1');

    // this.dataHandler.categorySubject.subscribe(categories => this.categories = categories);
    // this.categories = this.dataHandler.getCategories();
    // console.log(this.categories);
  }

  showTasksByCategory(category: Category): void {
    this.selectedCategory = category;
    // this.tas.fi
    // console.log(this.selectedCategory);
    // console.log('2');
    this.taskSearchValues.categoryId = category.id;

    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {
      // this.tasks = result;

    });
      // console.log(result);
    // });
    // TasksComponent. = this.taskService.findTasks(this.taskSearchValues);
    // this.tasksSubject.next(tasks);

    // console.log(category);
  }

  // fillTasksByCategory(category: Category): void {
  //   const tasks = TestData.tasks.filter(task => task.category === category);
  //   this.tasksSubject.next(tasks);
  //   // console.log(tasks);
  // }

}
