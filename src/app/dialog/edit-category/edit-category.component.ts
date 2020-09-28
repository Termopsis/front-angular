import {Component, Inject, OnInit} from '@angular/core';
import {Category} from 'src/app/model/Category';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import {DialogAction, DialogResult} from 'src/app/object/DialogResult';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  private dialogTitle: string;
  private category: Category;
  private canDelete = false;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.category = this.data[0];
    this.dialogTitle = this.data[1];

    if (this.category && this.category.id){
      this.canDelete = true;
    }

  }

  public confirm(): void{
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.category));
  }

  public delete(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '400px',
      data:{
        dialogTitle: "Подтвердите действие",
        message: `Вы уверены что хотите удалить категорию: "${this.category.title}"? (Удаляемая категория будет очищена в задачах)`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close(new DialogResult(DialogAction.DELETE, this.category));
      }
    });
  }

  public cancel(){
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

}
