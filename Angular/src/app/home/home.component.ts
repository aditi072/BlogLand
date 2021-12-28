import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy { 
  isAuthenticated = false;
  private userSub: Subscription; 

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
    this.isAuthenticated = !user ? false : true;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
