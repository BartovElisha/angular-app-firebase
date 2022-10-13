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
    // listen to collection changes
    this.getCollectionInRealTime('images');
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
