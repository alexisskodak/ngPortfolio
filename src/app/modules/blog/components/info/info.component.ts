import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {PostInterface} from '../../interfaces/post';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  post: PostInterface;
  postID: number;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.postID = parseInt(this.route.snapshot.paramMap.get('id'));
    setTimeout(() => {
      this.blogService.getPost(this.postID).subscribe(
        response => { this.post = response.body; },
        error => { this.error = error; }
      );
    }, 1000);
  }

  editPost(f: NgForm): void {
    this.blogService.updatePost(this.postID, f.value).subscribe(
      data => {
        console.log(data);
        this.post = f.value;
      }
    );
  }

  removePost(): void {
    // tslint:disable-next-line:radix
    this.blogService.deletePost(this.postID).subscribe();
  }

}
