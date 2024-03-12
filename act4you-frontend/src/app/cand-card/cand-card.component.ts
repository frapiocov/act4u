import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CosmosDBService } from '../services/azure-cosmosdb.service';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PdfViewerModule } from 'ng2-pdf-viewer';

class CandidaturaUtente {
  idUtente: string; // string or undefined
  files: any[]; // string or undefined
}

@Component({
  selector: 'app-cand-card',
  standalone: true,
  imports: [PdfViewerModule, MatCardModule, MatButtonModule, CommonModule, MatListModule, MatDividerModule],
  templateUrl: './cand-card.component.html',
  styleUrl: './cand-card.component.scss'
})
export class CandCardComponent implements OnInit {
  @Input() ann: any;

  /**
   * {utente, annuncio, file, type}
   */
  candidati: any[] = [];

  // lista di file associati ad ogni utente
  /**
   * {
   * idutente, lista file [{file,type}]
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
  addFileToUser(pos: number, idFile: string, type: string) {
    let url: string = "";

    switch (type) {
      case "png" || "jpeg" || "jpg":
        url = this.downloadImage(idFile);
        break;
      case "mp4":
        url = this.downloadVideo(idFile);
        break;
      case "pdf":
        url = this.downloadFile(idFile);
        break;
      default:
        break;
    }

    let urlType = {
      url: url,
      type: type
    };

    this.filesCandidati[pos].files.push(urlType);
    // controlla se è un'immagine
  }

  public downloadImage(name: string) {
    return this.blobService.getImageUrl(name);
  }

  public downloadFile(name: string) {
    return this.blobService.getFileUrl(name);
  }

  public downloadVideo(name: string) {
    return this.blobService.getVideoUrl(name);
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
      this.addFileToUser(pos, this.candidati[index].file, this.candidati[index].type);
    }

  }


}
