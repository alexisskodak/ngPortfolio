import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Post, PostInterface} from '../../interfaces/post';
import {BlogService} from '../../services/blog.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  // Preparation de la liste des publications
  post = new Post();
  posts: PostInterface[];
  error: string;

  // Pagination
  page = 1;
  count = 0;
  tableSize = 12;
  tableSizes = [12, 24, 48, 96];

  constructor(
    // Instance du service "BlogService"
    private blogService: BlogService,
    // Instance du message d'alerte snackbar
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.retrievePosts();
  }

  retrievePosts(): void {
    this.blogService.getPosts().subscribe(
      response => { this.posts = response.body; },
      error => { this.error = error; }
    );
  }

  openSnackBar(): void {
    this.snackbar.open('Post added successfully', 'Dismiss', {
      duration: 2000,
    });
  }

  openErrorSnackbar(): void {
    this.snackbar.open('Title must be at least 5 characters long', '', {
      duration: 2500,
      panelClass: 'error-snackbar',
    });
  }

  pushPost(f: NgForm): void {
    if (f.valid) {
      this.blogService.addPost(f.value).subscribe(
        (result) => { this.posts.push(result); }
      );
      this.openSnackBar();
      f.resetForm();
    }
    else {
      this.openErrorSnackbar();
    }
  }
}
