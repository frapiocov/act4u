const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const annuncioSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: String,
    desc: String,
    agency: String,
    type: String,
    data: String,
    contact: String
  },
  {
    collection: 'annunci'
  }
);

const Annuncio = mongoose.model('Annuncio', annuncioSchema);

module.exports = Annuncio;