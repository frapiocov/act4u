import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnnuncioService } from '../services/azure-cosmosdb.service';
import { Annuncio } from '../annuncio/annuncio.model';
import { AnnuncioComponent } from '../annuncio/annuncio.component';
import * as uuid from 'uuid';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-new-annuncio',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, MatFormFieldModule, MatInputModule, MatSelectModule, AnnuncioComponent],
  templateUrl: './new-annuncio.component.html',
  styleUrl: './new-annuncio.component.scss'
})
export class NewAnnuncioComponent implements OnInit {
  newAnn: Annuncio; // l'annuncio da aggiungere
  annunci: any[] = [];

  // form controls
  annForm = new FormGroup({
    title: new FormControl(""),
    agency: new FormControl(""),
    desc: new FormControl(""),
    type: new FormControl(""),
    contact: new FormControl("")
  });

  constructor(private annService: AnnuncioService) { }

  ngOnInit() {
    this.getAnnunci();
  }

  // retrieve degli annunci
  async getAnnunci() {
    this.annunci = await this.annService.getAnnunci();
  }

  deleteAnnuncio(ann: Annuncio) {
    this.annService.deleteAnnuncio(ann);
  }

  save() {
    // aggiunge la data odierna
    const currentDateAndTime = new Date();
    this.newAnn.data = currentDateAndTime.toLocaleString();
    // crea un id univoco prima di salvare il dato 
    this.newAnn.id = uuid.v4();

    /** lettura valori annuncio */
    this.newAnn.title = this.annForm.value.title!;
    this.newAnn.desc = this.annForm.value.desc!;
    this.newAnn.agency = this.annForm.value.agency!;
    this.newAnn.contact = this.annForm.value.contact!;
    this.newAnn.type = this.annForm.value.type!;

    console.warn(this.newAnn);
    if (this.newAnn) {
      this.annService.addAnnuncio(this.newAnn);
      this.annunci.push(this.newAnn);
    }
  }

}
