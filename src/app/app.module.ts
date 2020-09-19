import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from "./views/tasks/tasks.component";

import {
  MatButtonModule, MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatNativeDateModule, MatOptionModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditTaskComponent } from './dialog/edit-task/edit-task.component';
// @ts-ignore
import {FormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TaskDatePipe } from './pipe/task-date.pipe';

import {registerLocaleData} from '@angular/common';
import localRu from '@angular/common/locales/ru';

registerLocaleData(localRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskComponent,
    ConfirmDialogComponent,
    TaskDatePipe
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [],
  entryComponents: [
    EditTaskComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
