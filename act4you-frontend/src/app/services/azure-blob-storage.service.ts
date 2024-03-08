import { Injectable } from "@angular/core"
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

@Injectable({
    providedIn: 'root'
})
export class AzureBlobStorageService{

    accountName = "act4ublob2";
    imageSasToken = "sp=r&st=2024-02-29T19:50:24Z&se=2025-07-01T02:50:24Z&sv=2022-11-02&sr=c&sig=nQO%2BfAQ9Rt1lxeAKM0NRo9Ali8zoHt3ElVHB6gPlPSc%3D";
    videoSasToken = "sp=racwdli&st=2024-02-29T19:51:50Z&se=2025-04-02T02:51:50Z&sv=2022-11-02&sr=c&sig=LRGeDugcJMlDUf%2B6ynZZag%2FncuY2KPBZSFGC57ntXY0%3D";
    fileSasToken = "sp=racwdli&st=2024-02-29T19:49:49Z&se=2025-04-01T02:49:49Z&sv=2022-11-02&sr=c&sig=ciDCdlft2%2BJxctpCKvUe%2FSbfPqWYcwyv4pIHlxyLxIo%3D";

    constructor() {}

    getImageUrl(blobName: string): string {
        return `https://${this.accountName}.blob.core.windows.net/pictures/${blobName}`;
    }

    getVideoUrl(blobName: string): string {
        return `https://${this.accountName}.blob.core.windows.net/videos/${blobName}`;
    }

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