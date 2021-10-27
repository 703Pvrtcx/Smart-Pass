import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  collectionName = 'userProfile';
  
  constructor(private asf: AngularFirestore) { }

  adduserAddress(book){
    this.asf.collection('UserInfo').add(book).then(() => {
      //Successful
      alert('Account added successfully');
    }).catch(err => { 
      alert(err.message + ' account was unable to be added!');
    })
  }
  getUserInfo(userID){
    return this.asf.collection('UserInfo', ref => ref.where('userID','==', userID)).snapshotChanges();
  }
  createUser(user:Account){
    this.asf.collection(this.collectionName).add(user).then(() => {
      window.alert(user.email + ' account has added successfully');
    }).catch(err => { 
      window.alert(err.message + ' account was unable to be added!');
    })
  }
  readUser(userID){
    return this.asf.collection(this.collectionName, ref => ref.where('userID','==', userID)).snapshotChanges();
  }
  read_students() {
    return this.asf.collection(this.collectionName).snapshotChanges();
  }
  update_student(recordID, record) {
    this.asf.doc(this.collectionName +'/'+ recordID).update(record);
  }
  delete_student(record_id) {
    this.asf.doc(this.collectionName + '/' + record_id).delete();
  }
}