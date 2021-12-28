import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/auth.service';
import { BlogService } from '../blogs/blog.service';
import { Post } from '../blogs/post.model';

export interface ResponseData {
  blogId: string;
  code: Number;
  status: string;
  message: string;
  showBlog: string;
}

@Component({
  selector: 'app-pen',
  templateUrl: './pen.component.html',
  styleUrls: ['./pen.component.css']
})
export class PenComponent implements OnInit {
  @Input() control: FormControl
  penForm = this.fb.group({
    title: [''],
    content: [''],
  })

  postData = new Post();
  constructor(private authService: AuthService,
    private blogService: BlogService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.control = this.control ?? new FormControl()
  }

  onSubmit() {
    console.log(this.penForm);
  }
  
  onSave(){
    const userId = this.authService.id;
    console.log(userId);
  
    const topic = this.penForm.value.title;
    const htmlContent = this.penForm.value.content;
  
    this.blogService.addBlog(userId, topic, htmlContent);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  onClear() {
    this.penForm.reset();
  }

}
