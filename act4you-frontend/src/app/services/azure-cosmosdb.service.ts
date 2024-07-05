import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annuncio } from '../annuncio/annuncio.model';
import { Container, CosmosClient, Items, Database } from '@azure/cosmos';
//import { process.env } from '../../process.envs/process.env';

@Injectable({
  providedIn: 'root'
})
export class CosmosDBService {

  database: Database;
  
  container: Container;
  containerCand:Container;

  client: CosmosClient;
  
  annunci: Items;
  candidature: Items;
  
  partitionKey = {kind:'Hash', paths:['/annuncidb']};
  option = {
    endpoint: process.env['cosmosEndpoint']!,
    key: process.env['cosmosKey']!,
    userAgentSuffix:'Act4You'
  };


  constructor(private http: HttpClient) {
    this.initializeDB();
  }

  initializeDB() {
    this.client = new CosmosClient(this.option);

    this.annunci = this.client.database(process.env['cosmosDBName']!).container(process.env['collectionAnnunci']!).items;
    this.candidature = this.client.database(process.env['cosmosDBName']!).container(process.env['collectionCandidature']!).items;

    this.database = this.client.database(process.env['cosmosDBName']!);
    this.container = this.client.database(process.env['cosmosDBName']!).container(process.env['collectionAnnunci']!);
    this.containerCand = this.client.database(process.env['cosmosDBName']!).container(process.env['collectionCandidature']!);
  }

  async getAnnunci() {
    const querySpec = { query: "SELECT * FROM Annunci" };

    var listAnnunci: any = [];
    var {resources: results} = await this.annunci.query(querySpec).fetchAll();
     for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      let resultObj = JSON.parse(resultString);
      listAnnunci.push(resultObj);
    }
    return listAnnunci;
  }

  async getAnnunciById(id: string) {
    // ricerca un annuncio dato un id utente
    const querySpec = { query: "SELECT * FROM Annunci a where a.idUtente=@idUt", parameters: [{
      name: "@idUt",
      value: id,
  }], };

    var listAnnunci: any = [];
    var {resources: results} = await this.annunci.query(querySpec).fetchAll();
     for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      let resultObj = JSON.parse(resultString);
      listAnnunci.push(resultObj);
    }
    return listAnnunci;
  }

  async getCandByAnnuncio(id: string) {
    // ricerca le candidature dato un annuncio
    const querySpec = { query: "SELECT * FROM Candidature c where c.annuncio=@id", parameters: [{
      name: "@id",
      value: id,
  }], };

    var listCandidature: any = [];
    var {resources: results} = await this.candidature.query(querySpec).fetchAll();
     for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      let resultObj = JSON.parse(resultString);
      listCandidature.push(resultObj);
    }
    return listCandidature;
  }

  //rimuove un annuncio
  async deleteAnnuncio(ann: Annuncio) {
    const item = this.container.item(ann.id);
    await item.delete();
  }

  // inserimento annuncio
  async addAnnuncio(ann: Annuncio) {
    await this.container.items.upsert(ann);
    console.log("item added");
  }

  async addCandidatura(cand: any) {
    await this.containerCand.items.upsert(cand);
  }

  async updateAnnuncio(ann: Annuncio) {
    // update info annuncio
    const item = await this.container.item(ann.id).replace(ann);
    console.log("item updated");
  }

  async findWithQuery(query: string) {
    var listAnnunci: any = [];
    if (this.container) {
      throw new Error('Collection is not initialized.')
    }
    var {resources: results} = await this.annunci.query(query).fetchAll();
    for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      listAnnunci.push(resultString);
    }
    return listAnnunci;
  }

}
