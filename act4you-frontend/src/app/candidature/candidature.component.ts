import { Component, OnInit } from '@angular/core';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';
import { CosmosDBService } from '../services/azure-cosmosdb.service';
import { CommonModule } from '@angular/common';
import { CandCardComponent } from '../cand-card/cand-card.component';

@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [CommonModule, CandCardComponent],
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.scss'
})
export class CandidatureComponent implements OnInit{
  imagesList: string[];
  videoList: string[];
  filesList: string[];

  annunci: any[];
  fileListAnnuncio: any[];
  userToken = "";
  userName = "";

  constructor(
    private blobService: AzureBlobStorageService,
    private cosmosService: CosmosDBService
  ){
    /* this.reloadImagesList();
    this.reloadFilesList();
    this.reloadVideoList(); */
  }

  ngOnInit(): void {
    this.userToken = sessionStorage.getItem('accToken')!;
    this.getAnnunciByUser(this.userToken);
  }
/* 
  public imageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      console.log(input.files[0]);
      const file = input.files[0];
      this.blobService.uploadImage(file, 'prova', () => { //il nome verrà preso dal db, creato con metodo da definire
        this.reloadImagesList();
      })
    }
  }

  public fileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      console.log(input.files[0]);
      const file = input.files[0];
      this.blobService.uploadFile(file, 'prova', () => { //il nome verrà preso dal db, creato con metodo da definire
        this.reloadFilesList();
      });
    }
  }

  
  public videoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      console.log(input.files[0]);
      const file = input.files[0];
      this.blobService.uploadVideo(file, 'prova', () => { //il nome verrà preso dal db, creato con metodo da definire
        this.reloadVideoList();
      })
    }
  }


  public deleteImage (name: string) {
    this.blobService.deleteImage(name, () =>{
      this.reloadImagesList();
    });
  }

  public deleteFile (name: string) {
    this.blobService.deleteFile(name, () =>{
      this.reloadFilesList();
    });
  }

  public deleteVideo (name: string) {
    this.blobService.deleteVideo(name, () =>{
      this.reloadVideoList();
    });
  } */

  public downloadImage (name: string) {
    this.blobService.downloadImage(name, blob => {
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  public downloadFile (name: string) {
    this.blobService.downloadFile(name, blob => {
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  public downloadVideo (name: string) {
    this.blobService.downloadVideo(name, blob => {
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  //chiamata per aggiornare lato fe le immagini
  public reloadImagesList() {
    this.blobService.listElement('pictures').then(list => {
      this.imagesList = list;
      console.log('Images', this.imagesList);
    })
  }

  public reloadVideoList() {
    this.blobService.listElement('videos').then(list => {
      this.videoList = list;
      console.log('Video', this.videoList);
    })
  }

  public reloadFilesList() {
    this.blobService.listElement('files').then(list => {
      this.filesList = list;
      console.log('Files', this.filesList);
    })
  }


  async getAnnunciByUser(token: string){
    this.annunci = await this.cosmosService.getAnnunciById(token);
  }

}
