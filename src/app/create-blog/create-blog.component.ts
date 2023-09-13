import { Component } from '@angular/core';
import { Post } from '../model/post';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  post: Post = {
    _id: '',
    title: '',
    content: '',
    username: '',
    img: '',
    category: '',
    date: ''
  };
  _id: string = '';
  title: string = '';
  content: string = '';
  username: string = '';
  img: string = '';
  category:string = '';
  date:string = '';
  allPosts: Post[] = [];

  constructor(private api: ApiService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.title = '';
    this.content = '';
    this.username = '';
    this.category = '';
    this.date = '';
    this.img = '';
    this.getAllPost();
  } //Get all Data Subscribe
  getAllPost() {
    this.api.getAllPosts().subscribe(
      (res) => {
        this.allPosts = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //get by ID Subscribe
  getPostById(post: Post) {
    this.api.getPostById(post._id).subscribe(
      (res) => {
        post = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //delete Data by Id  Subscribe
  deletePostData(post: Post) {
    if (
      window.confirm('Are you sure want to delete this data id:' + post._id)
    ) {
      this.api.deletePost(post._id).subscribe(
        (res) => {
          this.allPosts = [];
          this.getAllPost();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  //Create Post Data Subscribe
  createPostData() {
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;
    this.post.category = this.category;
    this.post.img = this.img;
    this.post.date = this.date;
    this.api.createPost(this.post).subscribe(
      (res) => {
        this.allPosts = [];
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //edit data by Id
  editPost(post: Post) {
    this.getPostById(post);
    this._id = post._id;
    this.title = post.title;
    this.content = post.content;
    this.username = post.username;
    this.category = post.category;
    this.img = post.img;
    this.date = post.date;
    
  }
  //updata data
  updatePost() {
    if (this.title == '' || this.content == '' || this.username == ''|| this.category ==''|| this.img ==''|| this.date =='') {
      alert('Please fill all the Values on feilds');
      return;
    }
    this.post._id = this._id;
    this.post.title = this.title;
    this.post.content = this.content;
    this.post.username = this.username;
    this.post.category = this.category;
    this.post.img = this.img;
    this.post.date = this.date;
    this.api.updatePost(this.post).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
