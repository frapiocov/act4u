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
  partitionKey = "annuncidb"

  constructor(private http: HttpClient) {
    this.initializeDB();
  }

  async initializeDB() {
    this.client = new CosmosClient({endpoint: env.endpoint, key: env.key}) 
    this.annunci = this.client.database(env.databaseName).container(env.collectionName).items;
    this.database = this.client.database(env.databaseName);
    this.container = this.client.database(env.databaseName).container(env.collectionName);
  }

  async getAnnunci() {
    const iterator = this.database.containers.readAll();
    var response = await iterator.fetchAll();
    console.log(response.resources);
    return response.resources;
  }

  async getAnnuncioById(id: string) {
    // ricerca un annuncio dato un id
    var response = await this.container.item(id, this.partitionKey).read()
    return response.resource
  }

  //rimuove un annuncio
  async deleteAnnuncio(ann: Annuncio) {
    const item = this.container.item(ann.id, this.partitionKey);
    await item.delete(); 
  }

 // inserimento annuncio
  async addAnnuncio(ann: Annuncio) {
   var response = await this.container.items.upsert(ann); 
    console.log("item added");
  }

  async updateAnnuncio(ann: Annuncio) {
    // update info annuncio
    const item = this.container.item(ann.id, this.partitionKey);
    await item.replace(ann);
    
    console.log("item updated");
  }

  async findWithQuery(query: string) {
    if (this.container) {
      throw new Error('Collection is not initialized.')
    }
    var response = await this.annunci.query(query).fetchAll();
    return response.resources;
  }

}
