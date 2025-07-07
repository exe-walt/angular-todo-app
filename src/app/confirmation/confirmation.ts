import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation',
  imports: [ MatDialogActions, MatDialogContent, MatDialogTitle ],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class Confirmation {

  constructor(public dialogRef: MatDialogRef<Confirmation>) { }

  closeDialog(message: string): void {
    this.dialogRef.close(message);
  }

}
