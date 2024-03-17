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

  async getAnnunciByUser(token: string){
    this.annunci = await this.cosmosService.getAnnunciById(token);
  }

}
