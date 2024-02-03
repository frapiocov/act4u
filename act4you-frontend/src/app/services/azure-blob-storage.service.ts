import { Injectable } from "@angular/core"
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";



@Injectable({
    providedIn: 'root'
})
export class AzureBlobStorageService{

    accountName = "act4ublob";
    imageSasToken = "sp=racwdl&st=2024-02-01T19:07:51Z&se=2024-02-02T03:07:51Z&spr=https&sv=2022-11-02&sr=c&sig=%2BlTT1N%2BiQR4puHxrAafU4g%2FLwIzT7XEdAzB38lvTBZM%3D";
    videoSasToken = "sp=racwdl&st=2024-02-01T19:08:27Z&se=2024-02-02T03:08:27Z&spr=https&sv=2022-11-02&sr=c&sig=U%2FUZaCQcchZIws7DLq86cRToOTk%2BUpm8l%2FFQt2kN3j4%3D";
    fileSasToken = "sp=racwdl&st=2024-02-01T17:08:39Z&se=2024-02-02T01:08:39Z&spr=https&sv=2022-11-02&sr=c&sig=iav2Up1dQTaUjXUEM8NZ4WfaFRalwifkkpINEiYudhw%3D";

    constructor() {}


    public downloadImage(name: string, handler: (blob:Blob) => void){
        const blobClient = this.containerClient('pictures').getBlobClient(name);
        blobClient.download().then(resp => {
            resp.blobBody?.then(blob => {
                handler(blob)
            })
        })
    }

    public deleteImage( name: string, handler: () =>void){
        this.containerClient(this.imageSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public  uploadImage( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient(this.imageSasToken).getBlockBlobClient(name);
        blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type}})
        .then(() => handler());
    }

    public downloadFile(name: string, handler: (blob:Blob) => void){
        const blobClient = this.containerClient('files').getBlobClient(name);
        blobClient.download().then(resp => {
            resp.blobBody?.then(blob => {
                handler(blob)
            })
        })
    }

    public deleteFile( name: string, handler: () =>void){
        this.containerClient(this.fileSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public  uploadFile( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient(this.fileSasToken).getBlockBlobClient(name);
        blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type}})
        .then(() => handler());
    }

    public downloadVideo(name: string, handler: (blob:Blob) => void){
        const blobClient = this.containerClient('videos').getBlobClient(name);
        blobClient.download().then(resp => {
            resp.blobBody?.then(blob => {
                handler(blob)
            })
        })
    }
    
    public deleteVideo( name: string, handler: () =>void){
        this.containerClient(this.videoSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public  uploadVideo( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient(this.videoSasToken).getBlockBlobClient(name);
        blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type}})
        .then(() => handler());
    }

    public async listElement(containerName: string): Promise<string[]> {
        let result: string[] = [];
        
        let blobs = this.containerClient(containerName).listBlobsFlat();

        for await (const blob of blobs){
            result.push(blob.name);
        }

        return result;
    }

    private containerClient(containerName: string, sas?: string): ContainerClient {
        let token = "";
        if (sas) {
            token = sas;
        }

        return new BlobServiceClient(
            `https://${this.accountName}.blob.core.windows.net?${token}`)
            .getContainerClient(containerName);
    }
}