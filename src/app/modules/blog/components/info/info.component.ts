import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {PostInterface} from '../../interfaces/post';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent implements OnInit {
  newPost: PostInterface;
  post: PostInterface;
  postID: number;
  error: string;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.postID = parseInt(this.route.snapshot.paramMap.get('id'));
    setTimeout(() => {
      this.getPostById(this.postID);
      }, 1000);
  }

  getPostById(id: number): void {
    this.blogService.getPost(this.postID).subscribe(
      response => { this.post = response.body; },
      error => { this.error = error; }
      );
  }

  openSnackBar(msg: string): void {
    this.snackbar.open(`Post ${msg} successfully`, 'Dismiss', {
      duration: 2000,
    });
  }

  openErrorSnackbar(): void {
    this.snackbar.open('Title must be at least 5 characters long', '', {
      duration: 2500,
      panelClass: 'error-snackbar',
    });
  }

  editPost(f: NgForm): void {
    if (f.valid) {
      this.blogService.updatePost(this.postID, f.value).subscribe(
        data => {
          console.log(data);
          this.post = f.value;
        }
      );
      this.openSnackBar('edited');
      this.submitted = true;
    }
    else {
      this.openErrorSnackbar();
    }
  }

  removePost(id: number): void {
    // tslint:disable-next-line:radix
    this.blogService.deletePost(id).subscribe();
    this.openSnackBar('deleted');
    this.post.title = '';
    this.post.body = '';
    this.submitted = true;
  }

}
