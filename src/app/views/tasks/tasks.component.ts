import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
// @ts-ignore
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditTaskComponent} from 'src/app/dialog/edit-task/edit-task.component';


// @ts-ignore
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  private dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator,{static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) private sort: MatSort;

  private tasks: Task[];

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  private getPriorityColor(task: Task): string{

    if (task.completed){
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

  private openEditTaskDialog(task: Task): void{

    const dialogRef = this.dialog.open(EditTaskComponent,{data: [task, "Редактирование задачи"],autoFocus: false})

    dialogRef.afterClosed().subscribe(result => {

      //обработка результата.
      if (result as Task){
        this.updateTask.emit(task);
        return;
      }
    })

  }

}
