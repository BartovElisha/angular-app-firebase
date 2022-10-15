import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit,OnDestroy {

  constructor(private afs: AngularFirestore, private imgService: ImagesService) { }

  unsubscribeToCollection:any;
  images:any[] = [];
  

  ngOnDestroy():void {
    // Stop listen to data changes when exit from components.
    this.unsubscribeToCollection();
  }  

  ngOnInit(): void {
    // wait 1 sec up to data will be valid, not Good, need add subscriber !!!
    setTimeout(() => {
      // Write all images to the firebase database (firestore)
      this.imgService.imagesArray.forEach((image:any) => {
        this.createDocumentByCollection('images',image.id,image);
      });
    },1000);

    // listen to collection changes
    this.getCollectionInRealTime('images');
  }

  createDocumentByCollection(collection:string,document:string,data:any): void {
    this.afs.collection(collection).doc(document).set({
        id: data.id,
        author: data.author,
        width: data.width,
        height: data.height,
        url: data.url,
        download_url: data.download_url})
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error);
    });
  }  

  // This function reports to all about changes in database.
  getCollectionInRealTime(collection:string,width:number = 0, height:number = 0) {
    this.unsubscribeToCollection = this.afs.collection(collection).ref.where('width','>=',width)
    .onSnapshot((documents) => {
      this.images = [];
      documents.forEach((doc) => {
        this.images.push(doc.data());
        console.log(doc.data());
      });
    },
    (error) => {
      console.log(error);
    });
  }
}
