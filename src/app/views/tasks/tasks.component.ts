import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditTaskComponent} from 'src/app/dialog/edit-task/edit-task.component';
import {ConfirmDialogComponent} from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {OpenType} from 'src/app/dialog/OpenType';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {



  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  private dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  private set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  //Обработка будет происходить в родительском классе app.component.ts
  //В родительской html делаем событие "(selectCategory)="onSelectCategory($event)""
  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  addTask = new EventEmitter<Task>();

  @Input()
  selectedCategory: Category;

  private selectedPriorityFilter: Priority;
  private selectedStatusFilter: boolean;
  private searchTaskText: string;
  private priorities: Priority[];

  private tasks: Task[];

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,
    private dataHandlerService: DataHandlerService,
  ) {
  }

  ngOnInit() {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    //this.dataHandlerService.getAllPriorities().subscribe(items => this.priorities = items);

    this.onSelectedCategory(null);
    //this.fillTable();
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  private getPriorityColor(task: Task): string {

    if (task.completed) {
      return '#979b9e';
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return 'rgba(246,246,246,0.62)';

  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private fillTable() {

    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;
    // обновить источник данных (т.к. данные массива tasks обновились)
    this.addTableObjects();

    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private openEditTaskDialog(task: Task): void {

    const dialogRef = this.dialog.open(EditTaskComponent, {data: [task, 'Редактирование задачи',OpenType.EDIT], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      //обработка результата.
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  private openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitles: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      this.deleteTask.emit(task);
    });
  }

  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);

  }

  private onSelectedCategory(category: Category) {
    this.selectCategory.emit(category);

  }

  private onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);

  }

  private onFilterByStatus(value: boolean) {

    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  private onFilterByPriority(priority: Priority){
    if (priority !== this.selectedPriorityFilter){
      this.selectedPriorityFilter = priority;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  private openAddTaskDialog(){

    const task = new Task(null,'',false,null,this.selectedCategory);

    const dialogRef = this.dialog.open(EditTaskComponent,{data: [task,'Добавление задачи',OpenType.ADD],autoFocus: false});

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
       this.addTask.emit(task);
      }
    });

  }

}
