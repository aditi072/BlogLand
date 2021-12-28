import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../user.model";
import {CookieService} from 'ngx-cookie-service';

export interface AuthResponseData {
    code: Number;
    status: string;
    message: string;
    token: any;
    id: string;
    userName: string;
}

@Injectable({providedIn: 'root'})
export class AuthService implements OnInit{
    error: string = null;
    id: string;
    token: string;
    userName: string;
    user = new BehaviorSubject<User>(null)

    constructor(private http: HttpClient, private router: Router,private cookieService:CookieService){}

    ngOnInit(){}

    login(email:string, password: string){
        return this.http.post<AuthResponseData>("http://localhost:3000/login",
        {
         userCredential: email,
         password,
        }
        ).pipe(
        tap(resData => {
            const user = new User(
                resData.token,
                resData.id,
                )
                this.token=resData.token;
                this.id=resData.id;
                this.userName = resData.userName;
                this.user.next(user);

                var now = new Date();
                var minutes = 30;
                now.setTime(now.getTime() + (minutes * 60 * 1000));
                document.cookie = 'token =' + resData.token+ ';expires=' + now.toUTCString();  
                document.cookie = 'userId =' + this.id +';expires=' + now.toUTCString();
                document.cookie = 'userName =' + this.userName +';expires=' + now.toUTCString();
                // this.cookieService.set('token', resData.token); 
                // this.cookieService.set('userId', resData.id); 
        })
        )
        .subscribe(
            resData => {
                console.log(resData);
                this.router.navigate(['./home']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
            }
        );
    }

    logout(){
        this.user.next(null);
        this.cookieService.delete('userId');  
        this.cookieService.delete('userName'); 
        this.cookieService.delete('token'); 
        this.cookieService.delete('blogId'); 
        window.location.reload();
    }

    public getToken(): string {
        return this.cookieService.get('token');
    }
    

    forgotPassword(email: any){
        return this.http.post("http://localhost:3000/forgetpassword/emaillink", {
            email
        })
        .subscribe(
            resData => {
              console.log(resData);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
            }
          );
    }

}
