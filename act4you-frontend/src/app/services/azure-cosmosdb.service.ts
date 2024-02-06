import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Annuncio } from '../annuncio/annuncio.model';
import { Container, CosmosClient, Items, Database } from '@azure/cosmos';
import { env } from './env.js'

@Injectable({
  providedIn: 'root'
})
export class AnnuncioService {

  database: Database;
  container: Container;
  client: CosmosClient;
  annunci: Items;
  partitionKey = {kind:'Hash', paths:['/annuncidb']};
  option = {
    endpoint: env.endpoint,
    key: env.key,
    userAgentSuffix:'Act4You'
  };


  constructor(private http: HttpClient) {
    this.initializeDB();
  }

  initializeDB() {
    this.client = new CosmosClient(this.option);

    this.annunci = this.client.database(env.databaseName).container(env.collectionName).items;
    this.database = this.client.database(env.databaseName);
    this.container = this.client.database(env.databaseName).container(env.collectionName);
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

  async getAnnuncioById(id: string) {
    // ricerca un annuncio dato un id
    var response = await this.container.item(id).read()
    return response.resource
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
