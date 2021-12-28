import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

export interface AuthResponseData {
  id: string,
  code: Number,
  status: string,
  message: string,
  username: string,
  bio: string,
  TopicsInterested: string
}

@Injectable({ providedIn: 'root' })
export class Auth2Service {
  error: string = null;
  id: string;
  userId: any;
  constructor(private http: HttpClient, private router: Router,private cookieService:CookieService) { }

  signup(fullName: string, email: string, contact: Number, DOB: Date, password: string, confirmPassword: string) {
    return this.http.post<AuthResponseData>("http://localhost:3000/signUp/basicInfo",
      {
        fullName,
        email,
        contact,
        DOB,
        password,
        confirmPassword,
      }
    )
      .subscribe(
        resData => {
          console.log(resData);
          this.id = resData.id;

          var now = new Date();
          var minutes = 30;
          now.setTime(now.getTime() + (minutes * 60 * 1000));

          // document.cookie = 'userId =' + this.id +';expires=' + now.toUTCString();
          this.cookieService.set('userId', this.id); 
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        }
      )
  }

  signup2(id: string, username: string, bio: string, myTopics: []) {
    return this.http.post<AuthResponseData>("http://localhost:3000/signUp/personalInfo",
      {
        id,
        username,
        bio,
        myTopics
      }
    )
      .subscribe(
        resData => {
          console.log(resData);
          this.router.navigate(['./home'])
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
        }
      );
  }

  genuserName(userName: any) {
    return this.http.post<AuthResponseData>("http://localhost:3000/checkusername", {
      userName
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
