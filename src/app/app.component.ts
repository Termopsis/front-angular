import {Component, OnInit} from '@angular/core';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CategoryService} from 'src/app/data/dao/impl/CategoryService';
import {Category} from 'src/app/model/Category';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My todo';

  // categoriesInAppComponent: Category[];

  constructor() {}

  // ngOnInit(): void {
  //   this.categoryService.findAll().subscribe(result => {
  //     this.categoriesInAppComponent = result;
  //     // console.log(result);
  //   });

    // console.log(this.categoriesInAppComponent);
    // console.log('3');
  // }

}
