import {Component, Inject, OnInit} from '@angular/core';
import {Category} from 'src/app/model/Category';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from 'src/app/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  //private category: Category;
  private dialogTitle: string;
  private title: string;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string],
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.title = this.data[0];
    this.dialogTitle = this.data[1];

  }

  public onConfirm(): void{
    //this.category.title = this.tmpTitle;

    //Должно быть вызвано обноелвение и кат и задач
    this.dialogRef.close(this.title);
  }

  public delete(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      maxWidth: '400px',
      data:{
        dialogTitle: "Подтвердите действие",
        message: `Вы уверены что хотите удалить категорию: "${this.title}"? (Удаляемая категория будет очищена в задачах)`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dialogRef.close('delete');
      }
    });
  }

  public onCancel(){
    this.dialogRef.close(false);
  }

}
