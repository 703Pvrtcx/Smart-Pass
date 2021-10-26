import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ManagementService } from '../../services/Admin/management.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private userService: ManagementService) { 
   }

  ngOnInit() {
    let userID = firebase.auth().currentUser.uid.toString();
   
    
  }

}
