import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditTaskComponent} from './dialog/edit-task/edit-task.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {TaskDatePipe} from './pipe/task-date.pipe';
import {registerLocaleData} from '@angular/common';
import localRu from '@angular/common/locales/ru';
import {EditCategoryComponent} from './dialog/edit-category/edit-category.component';
import {FooterComponent} from './views/footer/footer.component';
import {HeaderComponent} from './views/header/header.component';
import {StatComponent} from './views/stat/stat.component';
import {StatCardComponent} from './views/stat/stat-card/stat-card.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {SettingsDialogComponent} from './dialog/settings-dialog/settings-dialog.component';
import {PrioritiesComponent} from './views/priorities/priorities.component';
import {EditPriorityDialogComponent} from './dialog/edit-priority-dialog/edit-priority-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import {CATEGORY_URL_TOKEN} from 'src/app/data/dao/impl/CategoryService';
import {PRIORITY_URL_TOKEN} from 'src/app/data/dao/impl/PriorityService';
import {TASK_URL_TOKEN} from 'src/app/data/dao/impl/TaskService';
import {STAT_URL_TOKEN} from 'src/app/data/dao/impl/StatService';

registerLocaleData(localRu);



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryComponent,
    FooterComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    SettingsDialogComponent,
    PrioritiesComponent,
    EditPriorityDialogComponent
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
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule,
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
    },
  ],
  entryComponents: [
    EditTaskComponent,
    EditCategoryComponent,
    ConfirmDialogComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
