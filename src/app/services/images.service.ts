import { Injectable } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor() { }

  imagesArray: Image[] = [];

}
