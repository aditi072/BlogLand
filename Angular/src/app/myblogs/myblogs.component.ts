import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogService } from '../blogs/blog.service';
import { Post } from '../blogs/post.model';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  loadedPosts: Post[] = [];
  postSelected = new EventEmitter<Post>();
  postUpdated = new Subject<Post[]>();

  constructor(private cookieService: CookieService,
    private blogService: BlogService,
    private http: HttpClient) { }

  ngOnInit() {
    const userId = this.cookieService.get('userId');
    return this.http.post<Post[]>("http://localhost:3000/myblogs", {
      userId
    })
      .pipe(map((resData: any) => {
        const postsArray: Post[] = [];
        postsArray.push(resData);
        return postsArray;
      })
      )
      .subscribe(
        resData => {
          console.log(resData);
          this.loadedPosts = resData;
        },
      )
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id);
    
    this.postUpdated.next(this.loadedPosts.slice());
    
    // refresh the posts
    const userId = this.cookieService.get('userId');
    return this.http.post<Post[]>("http://localhost:3000/myblogs", {
      userId
    })
      .pipe(map((resData: any) => {
        const postsArray: Post[] = [];
        postsArray.push(resData);
        return postsArray;
      })
      )
      .subscribe(
        resData => {
          console.log(resData);
          this.loadedPosts = resData;
        },
      )
  }
}

