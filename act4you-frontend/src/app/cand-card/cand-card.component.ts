import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CosmosDBService } from '../services/azure-cosmosdb.service';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImageCognitiveService } from '../services/azure-computer-vision';
import { FaceRecognitionService } from '../services/azure-facerecognition.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

class CandidaturaUtente {
  idUtente: string; // string or undefined
  nomeUtente: string;
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

  candidati: any[] = [];
  filesCandidati: CandidaturaUtente[] = [];
  filesScartati: CandidaturaUtente[] = [];
  showDiscardedFiles = false;
  dataFile: any = {};

  constructor(private blobService: AzureBlobStorageService, private imgCognitiveService :ImageCognitiveService, private faceRecognition: FaceRecognitionService,
    private cosmosService: CosmosDBService, private http: HttpClient) {}

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
      case "jpg":
        this.imgCognitiveService.getPicDetails(this.downloadImage(idFile)).subscribe((picDetails)=>{
          this.faceRecognition.getFace(this.downloadImage(idFile)).subscribe((face)=>{
            url = this.downloadImage(idFile);
            //console.log(face);
            if(this.isInvalidImage(picDetails, face)) {
              this.saveInFileScartati(pos, url, type);
            } else this.saveInFileCandidati(pos, url, type);
          });
        });
        break;
      case "jpeg":
        this.imgCognitiveService.getPicDetails(this.downloadImage(idFile)).subscribe((picDetails)=>{
          this.faceRecognition.getFace(this.downloadImage(idFile)).subscribe((face)=>{
            url = this.downloadImage(idFile);
            //console.log(face);
            if(this.isInvalidImage(picDetails, face)) {
              this.saveInFileScartati(pos, url, type);
            } else this.saveInFileCandidati(pos, url, type);
          });
        });
        break;
      case "png":
        this.imgCognitiveService.getPicDetails(this.downloadImage(idFile)).subscribe((picDetails)=>{
          this.faceRecognition.getFace(this.downloadImage(idFile)).subscribe((face)=>{
            url = this.downloadImage(idFile);
            console.log(face);
            if(this.isInvalidImage(picDetails, face)) {
              this.saveInFileScartati(pos, url, type);
            } else this.saveInFileCandidati(pos, url, type);
          });
        });
        break;
      case "mp4":
        url = this.downloadVideo(idFile);
        this.saveInFileCandidati(pos, url, type);
        break;
      case "pdf":
        url = this.downloadFile(idFile);
        this.saveInFileCandidati(pos, url, type);
        break;
      default:
        break;
    }
  }

  public saveInFileCandidati(pos: number, url: string, type: string){
    let urlType = {
      url: url,
      type: type
    };

    urlType.url = url;
    urlType.type = type;
    this.filesCandidati[pos].files.push(urlType);
  }

  public saveInFileScartati(pos: number, url: string, type: string) {
    const urlType = {
      url: url,
      type: type
    };
  
    const newFilesScartatiItem = { ...this.filesScartati[pos], files: [...this.filesScartati[pos].files, urlType] };
    this.filesScartati[pos] = newFilesScartatiItem;
  }

  public isInvalidImage(resp: any, face: any): boolean{
    return resp.color.isBwImg || resp.color.isBWImg || resp.color.isRacyContent || resp.color.isAdultContent || resp.imageType.clipArtType ||
    resp.imageType.lineDrawingType || face.length === 0;
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
      let nomeUtente : string = this.candidati[index].nomeUtente;
      
      // controllo la posizione dell'utente
      let pos: number = this.checkPosition(idUtente);

      let item = {idUtente: idUtente, nomeUtente:nomeUtente, files: [] };

      if(pos == 0)
        this.filesCandidati.push(item); this.filesScartati.push(item);

      //this.filesCandidati[pos].files.push(this.candidati[index].file)  
      this.addFileToUser(pos, this.candidati[index].file, this.candidati[index].type);
    }

  }

  // utilizza ia document intelligence per analizzare il contenuto del file
  public analyzeFile(url: string) {
    const dataToSend = {url: url};
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post('https://serverdocint.azurewebsites.net/analyzedoc', JSON.stringify(dataToSend), {
      headers: headers
    })
    .subscribe(data => {
      this.dataFile = data;
    });

  }
}