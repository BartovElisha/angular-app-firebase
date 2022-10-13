import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit,OnDestroy {

  constructor(private afs: AngularFirestore) { }

  unsubscribeToCollection:any;
  images:any = [];

  ngOnDestroy():void {
    // Stop listen to data changes when exit from components.
    this.unsubscribeToCollection();
  }  

  ngOnInit(): void {

    // Example to write one image to firestore !!!
    this.createDocumentByCollection('images','1',{
      author: "Alejandro Escamilla",
      width: 5616,
      height: 3744,
      url: "https://unsplash.com/photos/LNRyGwIJr5c",
      download_url: "https://picsum.photos/id/1/5616/3744"});

    // listen to collection changes
    this.getCollectionInRealTime('images');
  }

  createDocumentByCollection(collection:string,document:string,data: any): void {
    this.afs.collection(collection).doc(document).set(data)
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error);
    })
  }  

  // use this function to create and update document.
  // Importent note, if document not exist the function will create document. recommendation to use update methode. 
  createDocumentByFulPath(pathToDocument:string,data:any,merge:boolean=true): void {
    this.afs.doc(pathToDocument).set(data,{merge:merge})
    .then((success) => {
      console.log(success);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // This function reports to all about changes in database.
  getCollectionInRealTime(collection:string) {
    this.unsubscribeToCollection = this.afs.collection(collection).ref
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
