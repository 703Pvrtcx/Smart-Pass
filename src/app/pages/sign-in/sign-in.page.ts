import { Component, NgZone, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder,FormControl, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, ToastController,LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/User-side/authentication.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signInForm: FormGroup;
  submitError: string;
  submitSuccess: string;
  authRedirectResult: Subscription;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };
  constructor(   public angularFire: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    private authService: AuthenticationService) { 
      this.signInForm = new FormGroup({
        'email': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        'password': new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ]))
      });
    }
  ngOnInit() {
  }
  signInWithEmail() {
    this.authService.SignIn(this.signInForm.value['email'], this.signInForm.value['password'])  
  }
  
}
