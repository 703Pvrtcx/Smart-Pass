import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ManagementService } from '../../services/Admin/management.service';
import { AuthenticationService } from 'src/app/services/User-side/authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: any;
  constructor(private userService: ManagementService,
    private authService:AuthenticationService) { 
   }

  ngOnInit() {
    this.user = this.authService.userData;
  }

}
