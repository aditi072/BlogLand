import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogCardComponent } from './blogs/blog-card/blog-card.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { ContactComponent } from './contact/contact.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PenComponent } from './pen/pen.component';
import { QuillModule } from 'ngx-quill';
import { AuthService } from './auth/login/auth.service';
import { Auth2Service } from './auth/signup/auth2.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorInterceptor } from './auth/auth.interceptor.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { HtmlToPlaintextPipe } from './blogs/blog-list/htmltoText.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    LoginComponent,
    SignupComponent,
    PenComponent,
    ContactComponent,
    MyblogsComponent,
    BlogsComponent,
    BlogListComponent,
    BlogCardComponent,
    BlogDetailComponent,
    HtmlToPlaintextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatListModule,
    QuillModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthService,
    Auth2Service,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
