export class Image {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;

    constructor(
        id: string,
        author: string,
        width: number,
        height: number,
        url: string,
        download_url: string) {
        
        this.id = id;
        this.author = author;
        this.width = width;
        this.height = height;
        this.url = url;
        this.download_url = download_url;
    }
}