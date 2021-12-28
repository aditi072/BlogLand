import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map} from 'rxjs/operators';
import { Auth2Service } from 'src/app/auth/signup/auth2.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

export class BlogListComponent implements OnInit {
  loadedFeed: Post[] = [];
  numOfLikes : number = 0;

  constructor(private http: HttpClient, private cookieService: CookieService, private auth2Service: Auth2Service) { }

  ngOnInit(){
    return this.http.get<Post[]>("http://localhost:3000/feedblog")
    .pipe(map((resData: any) => {
      const postsArray: Post[] = [];
      postsArray.push(resData);
      return postsArray;
    })
    )
    .subscribe(
      resData => {
        console.log(resData);
        this.loadedFeed = resData;
      },
      );
  }

  onLike(Id){
    const userName = this.cookieService.get('userName');
    console.log(Id);
    return this.http.post<Post[]>("http://localhost:3000/countlikes", {
          Id,
          userName
        })
        // .pipe(
        //   tap(resData => {
        //       const user = new Post(
        //           resData.likesCount,
        //           // resData.id,
        //           )
        //           // this.token=resData.token;
        .subscribe(
          resData => {
            console.log(resData);     
          },
        )
  }

  onReadMore(){
    // const topic = this.auth2Service.topic;
    return this.http.post("", {
          // topic,
        })
        .subscribe(
          resData => {
            console.log(resData);
          },
        )
  }

}
