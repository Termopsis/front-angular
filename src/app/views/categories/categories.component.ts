import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from '@angular/material';
import {EditTaskComponent} from 'src/app/dialog/edit-task/edit-task.component';
import {EditCategoryComponent} from 'src/app/dialog/edit-category/edit-category.component';
import {OpenType} from 'src/app/dialog/OpenType';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory = new EventEmitter<string>();

  indexMouseMove: number;
  searchCategoryTitle: string;


  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {
  }

  // метод вызывается автоматически после инициализации компонента
  ngOnInit() {

  }

  showTasksByCategory(category: Category) {

    if(this.selectedCategory === category){
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number){
    this.indexMouseMove = index;
  }

  openEditCategoryDialog(category: Category){
    const dialogRef = this.dialog.open(EditCategoryComponent,{data: [category.title, 'Редактирование категории',OpenType.EDIT], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete'){
        this.deleteCategory.emit(category);
        return;
      }

      if (typeof (result) === 'string'){
        category.title = result as string;

        this.updateCategory.emit(category);
        return;
      }
    });
  }

  public onAddCategory(){
    //const category = new Category(null,'');

    const dialogRef = this.dialog.open(EditCategoryComponent,{data: ['','Добавление категории',OpenType.ADD],autoFocus: false});

    dialogRef.afterClosed().subscribe(result =>{
      if (result){
        this.addCategory.emit(result as string);
      }
    });
  }

  public search(){
    if(this.searchCategoryTitle == null){
      return;
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }

}
