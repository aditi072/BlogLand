import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ResponseData } from '../pen/pen.component';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  blogId: any;
  constructor(private http: HttpClient, private cookieService: CookieService){}
  loadedPosts: Post[] = [];

  addBlog(userId:string, topic:string, htmlContent:string){
    return this.http.post<ResponseData>("http://localhost:3000/addblog", {
      userId,
      topic,
      htmlContent
    })
      .subscribe(
        resData => {
          console.log(resData);
          if (resData.status = "success") {
            window.alert('Blog Added successfully!')
          }
          this.blogId=resData.blogId;
          this.cookieService.set('blogId', this.blogId);
        },
      );
  }

  deleteBlog(blogId:string){
        return this.http.post("http://localhost:3000/deleteblog",{blogId})
        .subscribe(
          resData => {
            console.log(resData);
            window.alert("Blog deleted successfully!");
          },
        )
        
  }
    
  getPostbyId(id:number) {
    this.blogId = this.loadedPosts[id];
    return this.loadedPosts[id];
  }
}
