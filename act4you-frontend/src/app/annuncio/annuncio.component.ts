import { Component, Inject, Input } from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';
import * as uuid from 'uuid';
import { CosmosDBService } from '../services/azure-cosmosdb.service';


@Component({
  selector: 'cand-dialog',
  templateUrl: 'dialog-cand.html',
  standalone: true,
  imports: [MatDialogTitle, CommonModule, MatIconModule, MatDialogContent, MatInputModule, MatFormField, MatProgressBarModule],
})

export class DialogData {

  uploadProgress: boolean = false;
  uploaded: boolean = false;

  files: FileList | null;
  idFile: string = "";

  associateIds = {
    utente: "",
    annuncio: "",
    file: "",
  }

  constructor(
    private blobService: AzureBlobStorageService,
    private cosmosService: CosmosDBService,
    @Inject(MAT_DIALOG_DATA) public data: { idAnn: string }
  ) { }

  public uploadFile() {
    this.uploadProgress = true;

    if (this.files) {

      Array.from(this.files).forEach(file => {

        //creazione id file
        this.idFile = uuid.v4();

        // upload su blob in base al tipo di dato
        switch (file.name.split('?')[0].split('.').pop()) {
          case "pdf":
            this.blobService.uploadFile(file, this.idFile, () => { });
            break;
          case "jpg":
            this.blobService.uploadImage(file, this.idFile, () => { });
            break;
          case "png":
            this.blobService.uploadImage(file, this.idFile, () => { });
            break;
          case "mp4":
            this.blobService.uploadVideo(file, this.idFile, () => { });
            break;
          default:
            break;
        }
      });

      // costruzione object json da conservare in cosmos
      this.associateIds.annuncio = this.data.idAnn;
      this.associateIds.utente = sessionStorage.getItem("accToken")!;
      this.associateIds.file = this.idFile;
      //upload in cosmos dell'associazione file-annuncio-utente
      this.cosmosService.addCandidatura(this.associateIds);
    }

    // completato l'upload
    this.uploadProgress = false;
    this.uploaded = true;
  }

  public onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if(input && input.files){
      this.files = input.files;
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
      data: { idAnn: this.ann.id },
      height: '240px',
      width: '460px',
    });
  }
}
