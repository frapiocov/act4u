import { Component, Inject, Input, OnInit } from '@angular/core';
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
import { MatDividerModule } from '@angular/material/divider';

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
    nomeUtente: "",
    annuncio: "",
    file: "",
    type: ""
  }

  constructor(
    private blobService: AzureBlobStorageService,
    private cosmosService: CosmosDBService,
    @Inject(MAT_DIALOG_DATA) public data: { idAnn: string }
  ) { }

  public uploadFile() {
    this.uploadProgress = true;
    let filetype: string = "";

    if (this.files) {

      Array.from(this.files).forEach(file => {

        //creazione id file
        this.idFile = uuid.v4();

        // upload su blob in base al tipo di dato
        filetype = file.name.split('?')[0].split('.').pop()!;

        switch (filetype) {
          case "pdf":
            this.blobService.uploadFile(file, this.idFile, () => { });
            break;
          case "jpg": case "jpeg": case "png":
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
      this.associateIds.nomeUtente = sessionStorage.getItem("accName")!;
      this.associateIds.file = this.idFile;
      this.associateIds.type = filetype;
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
  imports: [MatCardModule, MatButtonModule, CommonModule, DialogData, MatDividerModule],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent implements OnInit{

  constructor(public dialog: MatDialog) { }

  @Input() ann: any;
  userType: string | undefined = 'user';
  loginDisplay: boolean = false;

  ngOnInit(): void {
      let token: string = sessionStorage.getItem("accToken")!;  
      if( token != "" && token != null){
        this.loginDisplay = true;
      }
  }

  public openDialog() {
    this.dialog.open(DialogData, {
      data: { idAnn: this.ann.id },
      height: '240px',
      width: '460px',
    });
  }
}
