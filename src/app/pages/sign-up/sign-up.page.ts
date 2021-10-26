import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';
import { UserInfoService } from 'src/app/services/user-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/User-side/authentication.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user = {} as Account;
  signUpForm: FormGroup;
  submitError: string;
  authRedirectResult: Subscription;
  validation_messages = {
    'firstname': [
      { type: 'required', message: 'First name is required.' },
     { type: 'pattern', message: 'First name cannot be empty' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' },
     { type: 'pattern', message: 'Last name cannot be empty' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ],
    'confirmpassword': [
      { type: 'required', message: ' Corfirmation password is required.' },
      { type: 'minlength', message: 'Confirmation password must match password.' }
    ]
  };

  constructor(    public authService: AuthenticationService,private asf: AngularFirestore,
    public router: Router, private userService: UserInfoService,
     public loadingCtrl: LoadingController,) {
      this.signUpForm = new FormGroup({
        'firstname': new FormControl('', Validators.compose([
          Validators.required,
          //Validators.pattern('^[a-zA-Z]')
        ])),
        'lastname': new FormControl('', Validators.compose([
          Validators.required,
          //Validators.pattern('^[a-zA-Z]')
        ])),
        'email': new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        'password': new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ]))
        ,'confirmpassword': new FormControl('', Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])),
      },{
        validators: this.password.bind(this)
       });
      }

  ngOnInit() {
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  async presentLoading() {
  const loader = this.loadingCtrl.create({
    message: "Signing in....",
    duration: 5000
  });
  (await loader).present();
  }
  signUpWithEmail() {
    this.presentLoading();
          // this.user.id = firebase.auth()
          // this.user.firstname = this.signUpForm.value['firstname'],
          // this.user.lastname = this.signUpForm.value['lastname'],
          // this.user.email = this.signUpForm.value['email'],
          // this.user.roleId = 3,
          // this.user.gender = "Male"
          // this.user.phone = "071 1515 886",
         this.authService.RegisterUser(this.signUpForm.value['email'], this.signUpForm.value['password'])
          .then(() => {
          // this.userService.createUser(this.user);
          this.loadingCtrl.dismiss();
  })
  .catch(error => {
    this.submitError = error.message;
  });
  }

}
