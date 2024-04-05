<div align="center">
  <h1>
    <br/>
    ☁️
    <br />
    act4you
    <br />
  </h1>
  <sup>
    <h3>
    Progetto del corso di Cloud Computing con i servizi di Microsoft Azure
    </h3>
    </em>
</sup>
</div>

---

## Panoramica del progetto
Act4You nasce come web application sviluppata in Angular per attori/attrici in cerca di ingaggio per film, serieTV, spot pubblicitari, opere teatrali. L’obiettivo è collegare i due mondi offrendo varie funzionalità comuni.
Si tratta di una piattaforma collaborativa dove ogni utente può inserire i propri annunci e candidarsi a quelli degli altri.

## Feature principali
Act4You al momento offre le seguenti funzionalità:
1. Login e registrazione:
L’utente può registrarsi alla piattaforma attraverso il proprio account Microsoft
2. Pubblica un annuncio:
L’utente può pubblicare nuovi annunci sulla piattaforma
3. Candidature annunci:
L’utente può candidarsi agli annunci degli altri utenti caricando i propri file (foto, video, pdf)
4. Notifiche annunci:
L’utente riceve notifiche quando nuovi annunci vengono pubblicati sulla piattaforma
5. Sezione QnA:
L’utente ha la possibilità di chattare,  nel caso di dubbi sulla piattaforma o sul suo funzionamento,  con un bot conversazionale nell’apposita sezione
6. Analisi documenti:
L’utente può analizzare le immagini e i pdf dei candidate ai propri annunci utilizzando funzionalità che utilizzano l’IA.

## Architettura
![arch_prog](assets/arch-prog.png)

## Servizi Azure
Act4You utilizza vari servizi per implementare le funzionalità che offre, di seguito quelli utilizzati:
1. Azure App Service
2. Azure Bot Service
3. Azure Entra ID (ex Azure Active Diretory)
4. Azure CosmosDB
5. Azure BlobStorage
6. Azure Function
7. Azure AI Vision
8. Azure AI Document Intelligence
9. Azure AI Translator

## Avvio app

Da terminale digitare `ng serve --open` per avviare l'applicazione web. In automatico verrà aperta la tab del browser o in alternativa l'url è `http://localhost:4200/`. L'app si ricarica automaticamente in caso di modifica ai source file.

Per inserire le varie Key dei servizi Azure modificare i valori in enviroments/environments.ts
