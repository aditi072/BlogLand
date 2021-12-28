import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../blog.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  // postData: Post = new Post();
  post : Post;
  id: number;
  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getPostbyId(this.id)
      // .pipe(takeUntil(this.unsubscribe$))
      // .subscribe(
      //   (result: Post) => {
      //     this.postData = result;
      //   }
      // );
      this.route.params
         .subscribe(
           (params: Params) => {
             this.id = +params['id'];
             this.post = this.blogService.getPostbyId(this.id);
           }
         );
  }

}
