import { Injectable } from "@angular/core"
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";



@Injectable({
    providedIn: 'root'
})
export class AzureBlobStorageService{

    accountName = "act4ublob";
    imageSasToken = "sp=racwdl&st=2024-02-05T11:06:14Z&se=2025-02-05T19:06:14Z&sv=2022-11-02&sr=c&sig=c%2FeP%2BayniymuxegEtq0b3gYWhe8C8KfVdtyeezLey48%3D";
    videoSasToken = "sp=racwdl&st=2024-02-05T11:02:34Z&se=2025-02-05T19:02:34Z&sv=2022-11-02&sr=c&sig=CDyByVL2eXkYdWOxCfcu0GMdFcaawbSZLrCjOnkdtho%3D";
    fileSasToken = "sp=racwdl&st=2024-02-05T11:06:50Z&se=2025-02-05T19:06:50Z&sv=2022-11-02&sr=c&sig=Z5myRiX%2FEKI%2B1e1jwqKTustCiItUqDgQKHv%2BM2b00uM%3D";

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