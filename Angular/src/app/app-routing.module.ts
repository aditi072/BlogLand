import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { PenComponent } from './pen/pen.component';
import { ContactComponent } from './contact/contact.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { AuthGuard } from './auth/auth.guard';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'pendown', component: PenComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'myBlogs', component: MyblogsComponent, canActivate: [AuthGuard]},
  // { path: 'blogDetail', component: BlogDetailComponent},
  { path: ':id', component: BlogDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
