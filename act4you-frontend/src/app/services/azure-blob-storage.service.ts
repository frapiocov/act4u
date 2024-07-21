import { Injectable } from "@angular/core"
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AzureBlobStorageService{


    constructor() {}

    getImageUrl(blobName: string): string {
        return `https://${environment.blobStorageAccountName}.blob.core.windows.net/pictures/${blobName}`;
    }

    getVideoUrl(blobName: string): string {
        return `https://${environment.blobStorageAccountName}.blob.core.windows.net/videos/${blobName}`;
    }

    getFileUrl(blobName: string): string {
        return `https://${environment.blobStorageAccountName}.blob.core.windows.net/files/${blobName}`;
    }

    public deleteImage( name: string, handler: () =>void){
        this.containerClient('pictures', environment.imageSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public uploadImage( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient('pictures', environment.imageSasToken).getBlockBlobClient(name);
        blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type}})
        .then(() => handler());
    }

    public deleteFile( name: string, handler: () =>void){
        this.containerClient('files', environment.fileSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    uploadFile(file: Blob, fileName: string, handler: () => void) {
        const blockBlobClient = this.containerClient('files', environment.fileSasToken).getBlockBlobClient(fileName);
        blockBlobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type}})
        .then(() => handler());
    }

    public deleteVideo( name: string, handler: () =>void){
        this.containerClient('videos', environment.videoSasToken).deleteBlob(name).then(() =>{
            handler();
        })
    }

    public  uploadVideo( content: Blob, name: string, handler: () =>void){
        const blockBlobClient = this.containerClient('videos', environment.videoSasToken).getBlockBlobClient(name);
        blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type}})
        .then(() => handler());
    }

    private containerClient(containerName: string, sas?: string): ContainerClient {
        let token = "";
        if (sas) {
            token = sas;
        }

        return new BlobServiceClient(
            `https://${environment.blobStorageAccountName}.blob.core.windows.net?${token}`)
            .getContainerClient(containerName);
    }
}