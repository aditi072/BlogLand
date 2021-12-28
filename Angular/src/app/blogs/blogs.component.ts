import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [BlogService]
})
export class BlogsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
