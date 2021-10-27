import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  collectionName = 'users'; 
  constructor(private asf: AngularFirestore) { }

  createUser(user:Account){
    this.asf.collection(this.collectionName).add(user).then(() => {
      window.alert('Account added successfully');
    }).catch(err => { 
      window.alert(err.message + ' account was unable to be added!');
    })
  }
  readUser(userID){
    //return this.asf.collection(this.collectionName).doc(userID).valueChanges();
    return this.asf.collection(this.collectionName, ref => ref.where('uid','==', userID)).snapshotChanges();
  }
  read_users() {
    return this.asf.collection(this.collectionName).snapshotChanges();
  }
  update_user(recordID, record) {
    this.asf.doc(this.collectionName + '/' + recordID).update(record);
  }
  delete_user(record_id) {
    this.asf.doc(this.collectionName + '/' + record_id).delete();
  }
}
