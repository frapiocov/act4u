import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CosmosDBService } from '../services/azure-cosmosdb.service';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

class CandidaturaUtente {
  idUtente: string; // string or undefined
  files: any[]; // string or undefined
}

@Component({
  selector: 'app-cand-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatListModule, MatDividerModule],
  templateUrl: './cand-card.component.html',
  styleUrl: './cand-card.component.scss'
})
export class CandCardComponent implements OnInit {
  @Input() ann: any;

  /**
   * {utente, annuncio, file}
   */
  candidati: any[] = [];

  // lista di file associati ad ogni utente
  /**
   * {
   * idutente, lista file []
   * }
   */
  filesCandidati: CandidaturaUtente[] = [];

  constructor(private blobService: AzureBlobStorageService,
    private cosmosService: CosmosDBService) {}

  async ngOnInit() {
    this.candidati = await this.getFilesByAnnuncio();
    
    this.getUserFiles();
    //console.log("filecandidati: ",this.filesCandidati);
  }

  async getFilesByAnnuncio() {
    return this.cosmosService.getCandByAnnuncio(this.ann.id);
  }

  checkPosition(idUtente: string) {
    if (this.filesCandidati.length == 0)
      return 0;

    for (let index = 0; index < this.filesCandidati.length; index++) {
      if (this.filesCandidati[index].idUtente === idUtente)
        return index;
    }
    return 0;
  }

  // dato l'utente, carica da blob tutti i suoi dati
  addFileToUser(pos: number, idFile: string) {
    let url: string;

    // controlla se è un'immagine
    url = this.downloadImage(idFile);
    //console.log("url immagine:", url);
    if (url !== "" || url != null || url != undefined) {
      this.filesCandidati[pos].files.push(url);
      return;
    }

    // controlla se è un file
    url = this.downloadFile(idFile);
    if (url !== "" || url != null || url != undefined) {
      this.filesCandidati[pos].files.push(url);
      return;
    }

    // controlla se è un video
    url = this.downloadVideo(idFile);
    if (url !== "" || url != null || url != undefined) {
      this.filesCandidati[pos].files.push(url);
      return;
    }
  }

  public downloadImage(name: string) {
    this.blobService.downloadImage(name, blob => {
      let url = window.URL.createObjectURL(blob);
      return url;
    })
    return "";
  }

  public downloadFile(name: string) {
    this.blobService.downloadFile(name, blob => {
      let url = window.URL.createObjectURL(blob);
      return url;
    })
    return "";
  }

  public downloadVideo(name: string) {
    this.blobService.downloadVideo(name, blob => {
      let url = window.URL.createObjectURL(blob);
      return url;
    })
    return "";
  }

  // costruisco l'insieme dei file per ogni utente
  getUserFiles() {

    for (let index = 0; index < this.candidati.length; index++) {
      let idUtente : string = this.candidati[index].utente;
      
      // controllo la posizione dell'utente
      let pos: number = this.checkPosition(idUtente);

      let item = {idUtente: idUtente, files: [] };

      if(pos == 0)
        this.filesCandidati.push(item);

      //this.filesCandidati[pos].files.push(this.candidati[index].file)  
      this.addFileToUser(pos, this.candidati[index].file);
    }

  }


}
