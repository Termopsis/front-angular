import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material';
import {EditCategoryComponent} from 'src/app/dialog/edit-category/edit-category.component';
import {CategorySearchValues} from 'src/app/data/dao/search/SearchObjects';
import {DialogAction} from 'src/app/object/DialogResult';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('selectedCategory')
  set setCategory(selectedCategory: Category) {
    this.selectedCategory = selectedCategory;
  }

  @Input('categorySearchValues')
  set setCategorySearchValues(categorySearchValues: CategorySearchValues) {
    this.categorySearchValues = categorySearchValues;
  }

  // используется для категории Все
  @Input('uncompletedCountForCategoryAll')
  set uncompletedCount(uncompletedCountForCategoryAll: number) {
    this.uncompletedCountForCategoryAll = uncompletedCountForCategoryAll;
  }


  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<Category>();

  @Output()
  searchCategory = new EventEmitter<CategorySearchValues>();

  private categories: Category[];
  private indexMouseMove: number;
  private showEditIconCategory: boolean;
  private selectedCategory: Category;

  private filterTitle: string;
  private filterChanged: boolean;
  private categorySearchValues: CategorySearchValues;
  private uncompletedCountForCategoryAll: number;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public search() {
    this.filterChanged = false; // сбросить

    if (!this.categorySearchValues) { // если объект с параметрами поиска непустой
      return;
    }

    this.categorySearchValues.title = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValues);
  }

  private showCategory(category: Category) {

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  private showEditIcon(show: boolean, index: number) {
    this.indexMouseMove = index;
    this.showEditIconCategory = show;
  }

  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      //Передаем копию категории чтобы все изменения не касались оригинала.
      data: [new Category(category.id, category.title), 'Редактирование категории'],
      autoFocus: false,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteCategory.emit(category);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateCategory.emit(result.obj as Category);
        return;
      }

    });
  }

  public openAddDialog() {

    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: [new Category(null, ''), 'Добавление категории'],
      autoFocus: false,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addCategory.emit(result.obj as Category);
        return;
      }

    });
  }

  clearAndSearch() {
    this.filterTitle = null;
    this.search();
  }

  checkFilterChanged() {

    this.filterChanged = false;

    if (this.filterTitle !== this.categorySearchValues.title) {
      this.filterChanged = true;
    }

    return this.filterChanged;
  }

}
