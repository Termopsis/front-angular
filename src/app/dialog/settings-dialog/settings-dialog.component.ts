import {Component, OnInit} from '@angular/core';
import {Priority} from 'src/app/model/Priority';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  private priorities: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>) { }

  ngOnInit() {
  }

  private onClose(){
    this.dialogRef.close(false);
  }

  private onAddPriority(priority: Priority): void {
  }

  private onDeletePriority(priority: Priority): void {
  }

  private onUpdatePriority(priority: Priority): void {
  }

}
