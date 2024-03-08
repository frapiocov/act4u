import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';


@Component({
  selector: 'cand-dialog',
  templateUrl: 'dialog-cand.html',
  standalone: true,
  imports: [MatDialogTitle, CommonModule, MatIconModule, MatDialogContent, MatInputModule, MatFormField, MatProgressBarModule,],
})
export class DialogData {

  uploadProgress: boolean = false;
  uploaded: boolean = false;
  fileNames: string[] = [];

  constructor() { }
  
  public uploadFile() {
    this.uploadProgress = true;
    // load files in blob
    setTimeout(()=>{}, 5000);
    // completato l'upload
    this.uploadProgress = false;
    this.uploaded = true;
  }

  public onFileSelected(event: Event) {

    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    for (let f in files) {
      this.fileNames.push(f);
    }

  }
}


@Component({
  selector: 'app-annuncio',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, DialogData],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent {

  constructor(public dialog: MatDialog) { }

  @Input() ann: any;
  userType: string | undefined = 'user';


  public openDialog() {
    this.dialog.open(DialogData, {
      height: '350px',
      width: '480px',
    });
  } 
}
