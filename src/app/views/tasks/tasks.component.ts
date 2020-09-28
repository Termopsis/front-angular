import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from 'src/app/model/Task';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {EditTaskComponent} from 'src/app/dialog/edit-task/edit-task.component';
import {ConfirmDialogComponent} from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {OpenType} from 'src/app/dialog/OpenType';
import {TaskSearchValues} from 'src/app/data/dao/search/SearchObjects';
import {DialogAction} from 'src/app/object/DialogResult';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  // @ViewChild(MatSort, {static: false}) private sort: MatSort;

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.assignTableSource();
  }

  @Input('priorities')
  private set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('taskSearchValues')
  private set setTaskSearchValues(taskSearchValues: TaskSearchValues){
    this.taskSearchValues = taskSearchValues;
    this.initSearchValues(); // записать в локальные переменные
    this.initSortDirectionIcon(); //отображение иконки
  }

  @Input()
  selectedCategory: Category;

  @Input()
  totalTasksFounded: number;

  @Input()
  showSearch: boolean;


  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  //Обработка будет происходить в родительском классе app.component.ts
  //В родительской html делаем событие "(selectCategory)="onSelectCategory($event)""
  @Output()
  selectCategory = new EventEmitter<Category>();

  // @Output()
  // filterByPriority = new EventEmitter<Priority>();
  //
  // @Output()
  // filterByStatus = new EventEmitter<boolean>();
  //
  // @Output()
  // filterByTitle = new EventEmitter<string>();

  @Output()
  paging = new EventEmitter<PageEvent>();

  @Output()
  searchAction = new EventEmitter<TaskSearchValues>();

  @Output()
  toggleSearch = new EventEmitter<boolean>();



  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  private dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>(); // контейнер - источник данных для таблицы
  private tasks: Task[];
  private priorities: Priority[];
  private categories: Category[];



  private taskSearchValues: TaskSearchValues;
  // private selectedPriorityFilter: Priority;
  // private selectedStatusFilter: boolean;

  // фильры
  private filterTitle: string;
  private filterCompleted: number;
  private filterPriorityId: number;
  private filterSortColumn: string;
  private filterSortDirection: string;

  private sortIconName: string; // иконка сортировки (убывание, возрастание)

  private changed = false;

  // сортировка
  readonly defaultSortColumn = 'title';
  readonly defaultSortDirection = 'asc';

  // названия иконок из коллекции
  readonly iconNameDown = 'arrow_downward';
  readonly iconNameUp = 'arrow_upward';

  // цвета
  readonly colorCompletedTask = '#F8F9FA';
  readonly colorWhite = '#fff';

  constructor(private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
     //this.dataSource = new MatTableDataSource();
    //this.dataHandlerService.getAllPriorities().subscribe(items => this.priorities = items);
    //this.assignTableSource();
    // this.onSelectedCategory(null);
    //this.fillTable();
  }

  assignTableSource() {

    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

  }

  openAddDialog() {

    const task = new Task(null, '', 0, null, this.selectedCategory);

    const dialogRef = this.dialog.open(EditTaskComponent, {

      // передаем новый пустой объект  для заполнения
      // также передаем справочные даныне (категории, приоритеты)
      data: [task, 'Добавление задачи', this.categories, this.priorities]
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }

      if (result.action === DialogAction.SAVE) { // если нажали ОК
        this.addTask.emit(task);
      }
    });

  }

  openEditDialog(task: Task): void {

    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: [task, 'Редактирование задачи', this.categories, this.priorities],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteTask.emit(task);
        return;
      }

      if (result.action === DialogAction.COMPLETE) {
        task.completed = 1; // ставим статус задачи как выполненная
        this.updateTask.emit(task);
        return;
      }

      if (result.action === DialogAction.ACTIVATE) {
        task.completed = 0; // возвращаем статус задачи как невыполненная
        this.updateTask.emit(task);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateTask.emit(task);
        return;
      }

    });
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.title}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.deleteTask.emit(task);
        return;
      }
    });
  }


  // нажали/отжали выполнение задачи
  onToggleCompleted(task: Task) {
    if (task.completed === 0) {
      task.completed = 1;
    } else {
      task.completed = 0;
    }

    this.updateTask.emit(task);
  }


  // в зависимости от статуса задачи - вернуть цвет
  getPriorityColor(task: Task) {

    // если задача завершена - возвращаем цвет
    if (task.completed) {
      return this.colorCompletedTask;
    }

    // вернуть цвет приоритета, если он указан
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return this.colorWhite;

  }

  // в зависимости от статуса задачи - вернуть фоновый цвет
  getPriorityBgColor(task: Task) {

    if (task.priority != null && !task.completed) {
      return task.priority.color;
    }

    return 'none';
  }


// в это событие попадает как переход на другую страницу (pageIndex), так и изменение кол-ва данных на страниц (pageSize)
  pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }


  // параметры поиска
  initSearch() {

    // сохраняем значения перед поиском
    this.taskSearchValues.title = this.filterTitle;
    this.taskSearchValues.completed = this.filterCompleted;
    this.taskSearchValues.priority_id = this.filterPriorityId;
    this.taskSearchValues.sortColumn = this.filterSortColumn;
    this.taskSearchValues.sortDirection = this.filterSortDirection;

    this.searchAction.emit(this.taskSearchValues);

    this.changed = false; // сбрасываем флаг изменения

  }


  // проверяет, были ли изменены какие-либо параметры поиска (по сравнению со старым значением)
  checkFilterChanged() {

    this.changed = false;

    // поочередно проверяем все фильтры (текущее введенное значение с последним сохраненным)
    if (this.taskSearchValues.title !== this.filterTitle) {
      this.changed = true;
    }

    if (this.taskSearchValues.completed !== this.filterCompleted) {
      this.changed = true;
    }

    if (this.taskSearchValues.priority_id !== this.filterPriorityId) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortColumn !== this.filterSortColumn) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortDirection !== this.filterSortDirection) {
      this.changed = true;
    }

    return this.changed;

  }



  // выбрать правильную иконку (убывание, возрастание)
  initSortDirectionIcon() {

    if (this.filterSortDirection === 'desc') {
      this.sortIconName = this.iconNameDown;
    } else {
      this.sortIconName = this.iconNameUp;
    }
  }


  // изменили направление сортировки
  changedSortDirection() {

    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
    } else {
      this.filterSortDirection = 'asc';
    }

    this.initSortDirectionIcon(); // применяем правильную иконку

  }

  // проинициализировать локальные переменные поиска
  initSearchValues() {
    if (!this.taskSearchValues) {
      return;
    }
    this.filterTitle = this.taskSearchValues.title;
    this.filterCompleted = this.taskSearchValues.completed;
    this.filterPriorityId = this.taskSearchValues.priority_id;
    this.filterSortColumn = this.taskSearchValues.sortColumn;
    this.filterSortDirection = this.taskSearchValues.sortDirection;
  }

  // сбросить локальные переменные поиска
  clearSearchValues() {
    this.filterTitle = '';
    this.filterCompleted = null;
    this.filterPriorityId = null;
    this.filterSortColumn = this.defaultSortColumn;
    this.filterSortDirection = this.defaultSortDirection;
  }

  // показать/скрыть инструменты поиска
  onToggleSearch() {
    this.toggleSearch.emit(!this.showSearch);
  }

}
