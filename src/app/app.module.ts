import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './views/categories/categories.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { HttpClientModule} from '@angular/common/http';
import {TASK_URL_TOKEN} from 'src/app/data/dao/impl/task-service.service';
import {CATEGORY_URL_TOKEN} from 'src/app/data/dao/impl/category-service.service';
import {PRIORITY_URL_TOKEN} from 'src/app/data/dao/impl/priority-service.service';
import {STAT_URL_TOKEN} from 'src/app/data/dao/impl/stat-service.service';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [

    {
      provide: TASK_URL_TOKEN,
      useValue: 'http://localhost:8080/task'
    },
    {
      provide: CATEGORY_URL_TOKEN,
      useValue: 'http://localhost:8080/category'
    },
    {
      provide: PRIORITY_URL_TOKEN,
      useValue: 'http://localhost:8080/priority'
    },
    {
      provide: STAT_URL_TOKEN,
      useValue: 'http://localhost:8080/stat'
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
