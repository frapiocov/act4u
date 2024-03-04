import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-cand-popup',
  standalone: true,
  imports: [MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './cand-popup.component.html',
  styleUrl: './cand-popup.component.scss'
})
export class CandPopupComponent {
  constructor(public dialog: MatDialog) {}
}
