import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';
import * as Rx from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) { }

  // ngOnInit(): void {
  //   this.tasks = this.dataHandler.getTasks();
  //   // console.log(this.tasks);
  // }

  // rxJS
  ngOnInit(): void {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }
}
