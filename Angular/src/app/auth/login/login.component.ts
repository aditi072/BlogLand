import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    signup: boolean;
    LoginForm: FormGroup;
    error: String;
    reset = false;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(){
        this.LoginForm = new FormGroup({
            'email' : new FormControl(null, [Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]),
            'password': new FormControl(null, [Validators.required,Validators.minLength(5)])
        })
    }

    onSubmit(){
        console.log(this.LoginForm);
        if (!this.LoginForm.valid){
            return;
        }
        const userCredential = this.LoginForm.value.email;
        const password = this.LoginForm.value.password;

        this.authService.login(userCredential,password);
    }

    forgotPassword(){
      const userCredential = this.LoginForm.value.email;
      this.authService.forgotPassword(userCredential);
      this.reset = true;
    }

    onSignup(){
    this.signup = true;
    this.router.navigate(['/signup']);
    }
}