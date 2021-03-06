import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogAction, DialogResult} from 'src/app/object/DialogResult';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  private dialogTitle: string;
  private message: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string}
  ) {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
  }

  ngOnInit() {
  }

  //Подтверждение удаления. Вернем true
  private onConfirm() {
    this.dialogRef.close(new DialogResult(DialogAction.OK));
  }

  //Отмена удаления. Вернем false
  private onCancel(){
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }
}
