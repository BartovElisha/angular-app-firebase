import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private http: HttpClient,private imgService: ImagesService) { }
  
  API_URL = 'https://picsum.photos/v2/list';
  imagesArray: Image[] = this.imgService.imagesArray;

  ngOnInit(): void {
    this.getImagesFromApi();
  }

  // Getting all images from API link
  getImagesFromApi() {
    this.http.get(this.API_URL).subscribe({
      next: (imagesArray:any) => {
        imagesArray.forEach((image:any) => {
          this.imgService.imagesArray.push(new Image(
            image.id,
            image.author,
            image.width,
            image.height,
            image.url,
            image.download_url
          ));
        });
        // Test Images Array after getting
        // console.log(this.imgService.imagesArray);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('Compleate');
      }
    });
  }
}
