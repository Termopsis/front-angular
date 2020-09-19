import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from 'src/app/service/data-handler.service';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {ConfirmDialogComponent} from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

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

  private categories: Category[];
  private priorities: Priority[];
  private dialogTitle: string;
  private task: Task;

  private tpmTitle: string;
  private tmpCategory: Category;
  private tmpPriority: Priority;
  private tmpDate: Date;

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];

    this.tpmTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate =this.task.date;

    this.dataHandlerService.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandlerService.getAllPriorities().subscribe(items => this.priorities = items);

  }

  public onConfirm(): void{
    this.task.title = this.tpmTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);
  }

  private onCancel(): void{
    this.dialogRef.close(null);
  }

  private delete(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '500px',
      data:{
        dialogTitle: "Подтвердите действие",
        message: `Вы уверены что хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close('delete');
      }
    });
  }

  private completeTask(){

    this.task.completed = !this.task.completed;
    this.dialogRef.close(this.task);
  }


}
