import {Component, OnInit} from '@angular/core';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CategoryServiceService} from 'src/app/data/dao/impl/category-service.service';
import {Category} from 'src/app/model/Category';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'My todo';

  categories: Category[];

  constructor(
    private categoryService: CategoryServiceService
  ) {

  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
      console.log(result);
    });

    console.log(this.categories);
    console.log('3');
  }

}
