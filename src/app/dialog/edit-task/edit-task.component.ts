import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog,
  ) { }

  private dialogTitle: string;
  private task: Task;

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

  }

}
