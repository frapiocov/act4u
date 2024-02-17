import { Injectable } from "@angular/core"
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

@Injectable({
    providedIn: 'root'
})
export class AzureBlobStorageService{

    accountName = "act4ublob";
    imageSasToken = "sp=racwdl&st=2024-02-09T16:10:27Z&se=2025-02-10T00:10:27Z&spr=https&sv=2022-11-02&sr=c&sig=cKdvWUUsUlTblCRZsrKsn1j0CrGVFHPVnIm%2BNBfDcbs%3D";
    videoSasToken = "sp=racwdl&st=2024-02-05T11:02:34Z&se=2025-02-05T19:02:34Z&sv=2022-11-02&sr=c&sig=CDyByVL2eXkYdWOxCfcu0GMdFcaawbSZLrCjOnkdtho%3D";
    fileSasToken = "sp=racwdl&st=2024-02-09T16:08:14Z&se=2025-01-10T00:08:14Z&spr=https&sv=2022-11-02&sr=c&sig=TzNnNAbzNWEOXqacCtB3nTlWH6n46oFpEl9%2FJeqBQ3w%3D";

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
        this.containerClient('pictures', this.imageSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public uploadImage( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient('pictures', this.imageSasToken).getBlockBlobClient(name);
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
        this.containerClient('files', this.fileSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }


    uploadFile(file: Blob, fileName: string, handler: () => void) {
        const blockBlobClient = this.containerClient('files', this.fileSasToken).getBlockBlobClient(fileName);
        blockBlobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type}})
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
        this.containerClient('videos', this.videoSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public  uploadVideo( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient('videos', this.videoSasToken).getBlockBlobClient(name);
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