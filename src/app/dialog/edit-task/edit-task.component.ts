import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Task} from 'src/app/model/Task';
import {Category} from 'src/app/model/Category';
import {Priority} from 'src/app/model/Priority';
import {ConfirmDialogComponent} from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import {OpenType} from 'src/app/dialog/OpenType';
import {DialogAction, DialogResult} from 'src/app/object/DialogResult';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, Category[], Priority[]],
    private dialog: MatDialog,
  ) {}

  private categories: Category[];
  private priorities: Priority[];

  private dialogTitle: string;
  private task: Task;

  private newTitle: string;
  private newPriorityId: number;
  private newCategoryId: number;
  private newDate: Date;

  private oldCategoryId: number;

  private canDelete = false;
  private canComplete = false;

  private today = new Date();

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.categories = this.data[2];
    this.priorities = this.data[3];

    if (this.task && this.task.id > 0) {
      this.canDelete = true;
      this.canComplete = true;
    }

    this.newTitle = this.task.title;

    if (this.task.priority) {
      this.newPriorityId = this.task.priority.id;
    }

    if (this.task.category) {
      this.newCategoryId = this.task.category.id;
      this.oldCategoryId = this.task.category.id; // старое значение категории всегда будет храниться тут
    }

    if (this.task.date) {
      // создаем new Date, чтобы переданная дата из задачи автоматически сконвертировалась в текущий timezone
      // (иначе будет показывать время UTC)
      this.newDate = new Date(this.task.date);
    }

  }

  public confirm(): void{
    console.log("sda");
    console.log(this.categories);
    this.task.title = this.newTitle;
    this.task.priority = this.findPriorityById(this.newPriorityId);
    this.task.category = this.findCategoryById(this.newCategoryId);
    this.task.oldCategory = this.findCategoryById(this.oldCategoryId);

    if (!this.newDate) {
      this.task.date = null;
    } else {
      // в поле дата хранится в текущей timezone, в БД дата автоматически сохранится в формате UTC
      this.task.date = this.newDate;
    }


    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.task));

  }

  private cancel(): void{
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  private delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы уверены что хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

  private complete(){
    this.dialogRef.close(new DialogResult(DialogAction.COMPLETE));
  }

  activate() {
    this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
  }

  private findPriorityById(tmpPriorityId: number): Priority {
    return this.priorities.find(t => t.id === tmpPriorityId);
  }

  private findCategoryById(tmpCategoryId: number): Category {
    return this.categories.find(t => t.id === tmpCategoryId);
  }

  addDays(days: number) {
    this.newDate = new Date();
    this.newDate.setDate(this.today.getDate() + days);
  }

  setToday() {
    this.newDate = this.today;
  }

}
