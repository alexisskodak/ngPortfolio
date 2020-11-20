import { Component, OnInit } from '@angular/core';
import {Post, PostInterface} from '../../interfaces/post';
import {BlogService} from '../../services/blog.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
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

  pushPost(): void {
    this.post.id = this.posts.length + 1;
    this.blogService.addPost(this.post).subscribe(
      (result) => { this.posts.push(result); }
    );
  }

  onTableDataChange(event): void {
    this.page = event;
    this.retrievePosts();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.retrievePosts();
  }
}
