import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from "./views/tasks/tasks.component";
import {MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditTaskComponent } from './dialog/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [
    EditTaskComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
