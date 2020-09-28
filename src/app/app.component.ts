import {Component, OnInit} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {CategorySearchValues, TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';
import {CategoryService} from 'src/app/data/dao/impl/CategoryService';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {TaskService} from 'src/app/data/dao/impl/TaskService';
import {MatDialog, PageEvent} from '@angular/material';
import {PriorityService} from 'src/app/data/dao/impl/PriorityService';
import {StatService} from 'src/app/data/dao/impl/StatService';
import {Stat} from 'src/app/model/Stat';
import {DashboardData} from 'src/app/object/DashboardData';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];

  stat: Stat;
  dashBoard: DashboardData = new DashboardData();

  //null - отобразить всё.
  private selectedCategory: Category = null;

  //Показать/скрыть статистику
  private showStat: boolean;

  //Статистика по задачам
  uncompletedCountForCategoryAll: number;

  //Параметры поиска/Фильтрации
  categorySearchValues = new CategorySearchValues();
  taskSearchValues = new TaskSearchValues();

  totalTasksFounded: number;
  showSearch: boolean;

  readonly defaultPageSize = 5;
  readonly defaultPageNumber = 0;

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private priorityService: PriorityService,
    private statService: StatService,
    private dialog: MatDialog) {

    this.statService.getOverAllStat().subscribe(result => {     // сначала получаем данные статистики
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.unCompletedTotal;

      // заполнить категории
      this.fillAllCategories();

    });
  }

  ngOnInit(): void {
    this.fillAllPriorities();
  }



  ///КАТЕГОРИИ///////////////////////////////////////////////////////////////////////
  public addCategory(category: Category) {
    this.categoryService.add(category).subscribe(result => {
      this.searchCategory(this.categorySearchValues);
    });
  }

  public updateCategory(category: Category): void {
    this.categoryService.update(category).subscribe(result => {
      this.searchCategory(this.categorySearchValues);
      this.searchTasks(this.taskSearchValues);
    });
  }

  public deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(result => {
      this.selectedCategory = null; // выбираем категорию "Все"

      this.searchCategory(this.categorySearchValues);
      this.selectCategory(this.selectedCategory);
    });
  }

  public selectCategory(category: Category) {

    //Если категория выбрана, то заполним статистику только по ней
    if (category) {
      this.fillDashBoardData(category.completedCount, category.uncompletedCount);
    } else {
      this.fillDashBoardData(this.stat.completedTotal, this.stat.unCompletedTotal);
    }

    // сбрасываем, чтобы показывать результат с первой страницы
    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category;
    this.taskSearchValues.category_id = category ? category.id : null;

    this.searchTasks(this.taskSearchValues);
  }

  private fillAllCategories() {
    this.categoryService.findAll().subscribe(categories=>{
      this.categories = categories;
      this.selectCategory(this.selectedCategory);
    });
  }

  private searchCategory(categorySearchValues: CategorySearchValues): void {
    this.categoryService.findCategories(categorySearchValues).subscribe(categories => {
      this.categories = categories;
    });
  }



  //ПРИОРИТЕТЫ///////////////////////////////////////////////////////////////////////
  public fillAllPriorities(){
      this.priorityService.findAll().subscribe(result =>{
        this.priorities = result;
      });
  }



  //ЗАДАЧИ///////////////////////////////////////////////////////////////////////
  public addTask(task: Task) {
    this.taskService.add(task).subscribe(result => {
      if (task.category) { // если в новой задаче была указана категория
        this.updateCategoryCounter(task.category); // обновляем счетчик для указанной категории
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  public updateTask(task: Task) {
    this.taskService.update(task).subscribe(result => {
      if (task.oldCategory) { // если в изменной задаче старая категория была указана
        this.updateCategoryCounter(task.oldCategory); // обновляем счетчик для старой категории
      }

      if (task.category) { // если в изменной задаче новая категория была указана
        this.updateCategoryCounter(task.category); // обновляем счетчик для новой категории
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  public deleteTask(task: Task) {
    this.taskService.delete(task.id).subscribe(result => {
      if (task.category) { // если в удаленной задаче была указана категория
        this.updateCategoryCounter(task.category); // обновляем счетчик для указанной категории
      }

      this.updateOverallCounter();
      this.searchTasks(this.taskSearchValues);
    });
  }

  public onFilterTasksByStatus(status: boolean) {
    // this.statusFilter = status;
    // this.updateTasks();
  }

  public onSearchTasks(searchString: string) {
    // this.searchTaskText = searchString;
    // this.updateTasks();
  }

  public searchTasks(taskSearchValues: TaskSearchValues){
    this.taskSearchValues = taskSearchValues;
    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {

      // Если выбранная страница для отображения больше, чем всего страниц - заново делаем поиск и показываем 1ю страницу.
      // Если пользователь был например на 2й странице общего списка и выполнил новый поиск, в результате которого доступна только 1 страница,
      // то нужно вызвать поиск заново с показом 1й страницы (индекс 0)
      if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
        this.taskSearchValues.pageNumber = 0;
        this.searchTasks(this.taskSearchValues);
      }

      this.totalTasksFounded = result.totalElements; // сколько данных показывать на странице
      this.tasks = result.content; // массив задач
    });
  }

  public onFilterTaskByPriority(priority: Priority) {
    // this.priorityFilter = priority;
    // this.updateTasks();
  }



  //СТАТИСТИКА///////////////////////////////////////////////////////////////////////
  fillDashBoardData(completedCount: number, uncompletedCount: number) {
    this.dashBoard.completedTotal = completedCount;
    this.dashBoard.uncompletedTotal = uncompletedCount;
  }

  private toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  //Показать/Скрыть поиск
  private toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }

  //Обновить всю статитсику и счетчики
  private updateOverallCounter() {
    this.statService.getOverAllStat().subscribe((res => { // получить из БД актуальные данные
      this.stat = res; // получили данные из БД
      this.uncompletedCountForCategoryAll = this.stat.unCompletedTotal; // для счетчика категории "Все"

      if (!this.selectedCategory) { // если выбрана категория "Все" (selectedCategory === null)
        this.fillDashBoardData(this.stat.completedTotal, this.stat.unCompletedTotal); // заполнить дашборд данными общей статистики
      }
    }));
  }

  // обновить счетчик конкретной категории (и показать эти данные в дашборде, если выбрана эта категория)
  updateCategoryCounter(category: Category) {

    this.categoryService.findById(category.id).subscribe(cat => { // получить из БД актуальные данные

      this.categories[this.getCategoryIndex(category)] = cat; // заменить в локальном массиве

      this.showCategoryDashboard(cat);  // показать дашборд со статистикой категории

    });
  }

  showCategoryDashboard(cat: Category) {
    if (this.selectedCategory && this.selectedCategory.id === cat.id) { // если выбрана та категория, где сейчас работаем
      this.fillDashBoardData(cat.completedCount, cat.uncompletedCount); // заполнить дашборд данными статистики из категории
    }
  }

  // находит индекс элемента (по id) в локальном массиве
  getCategoryFromArray(id: number): Category {
    const tmpCategory = this.categories.find(t => t.id === id);
    return tmpCategory;
  }

  getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    return this.categories.indexOf(tmpCategory);
  }

  getCategoryIndexById(id: number): number {
    const tmpCategory = this.categories.find(t => t.id === id);
    return this.categories.indexOf(tmpCategory);
  }





  //ПОСТРАНИЧНОСТЬ///////////////////////////////////////////////////////////////////////
  //При изменении количества элементов на странице или при переходе на др. страницу
  private paging(pageEvent: PageEvent){

    this.taskSearchValues.pageSize = pageEvent.pageSize;
    //this.taskSearchValues.pageNumber = pageEvent.pageIndex;

    //Если изменили количество элементов на странице
    if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
      this.taskSearchValues.pageNumber = 0; // новые данные будем показывать с 1-й страницы (индекс 0)
    } else {
      // если просто перешли на другую страницу
      this.taskSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.searchTasks(this.taskSearchValues);

  }



}
