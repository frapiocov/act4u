import { Component } from '@angular/core';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';

@Component({
  selector: 'app-candidature',
  standalone: true,
  imports: [],
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.scss'
})
export class CandidatureComponent {
  imagesList: string[];
  videoList: string[];
  filesList: string[];

  constructor(
    private blobService: AzureBlobStorageService
  ){
    this.reloadImagesList();
    this.reloadFilesList();
    this.reloadVideoList();
  }

  public imageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const file = input.files[0];
      this.blobService.uploadImage(file, 'prova', () => { //il nome verrà preso dal db, creato con metodo da definire
        this.reloadImagesList();
      })
    }
  }

  public fileSelected(input: HTMLInputElement | null) {
    if (input && input.files) {
      const file = input.files[0];
      this.blobService.uploadFile(file, 'prova', () => { //il nome verrà preso dal db, creato con metodo da definire
        this.reloadFilesList();
      })
    }
  }

  
  public videoSelected(input: HTMLInputElement | null) {
    if (input && input.files) {
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
  }

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
    })
  }

  public reloadVideoList() {
    this.blobService.listElement('videos').then(list => {
      this.videoList = list;
    })
  }

  public reloadFilesList() {
    this.blobService.listElement('files').then(list => {
      this.filesList = list;
    })
  }
}
