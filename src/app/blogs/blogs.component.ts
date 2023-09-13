import { Component, Input } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Post } from '../model/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent {
  post:Post={
    _id: '',
    title: '',
    content: '',
    username: '',
    img: '',
    category: '',
    date: ''
  }
  _id:string='';
  title:string= '';
  content:string= '';
  username:string= '';
  img:string= '';
  category:string= '';
  date: string= '';

  allPosts:Post[]=[];
  blogDetails: undefined | Post;
  getAllPost: any;
  getPostById: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let blogId = this.route.snapshot.paramMap.get('blogId');

    blogId &&
      this.api.getPostById(blogId).subscribe((result) => {
        this.blogDetails = result;
      });
  }
  //delete Data by Id  Subscribe
  deletePostData(post: Post) {
    if(window.confirm('Are you sure want to delete this data id:'+post._id)){
      this.api.deletePost(post._id).subscribe(res => {
        this.allPosts = [];
       this.getAllPost();
      }, err => {
        console.log(err)
      })
    }
    
  }
  
//edit data by Id 
editPost(post:Post){
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
updatePost(){
  if(this.title ==''|| this.content =='' || this.username ==''|| this.category ==''|| this.img ==''|| this.date ==''){
    alert('Please fill all the Values on feilds');
    return;
  }
  this.post._id = this._id;
  this.post.title = this.title;
  this.post.content = this.content;
  this.post.username = this.username;
  this.post.category = this.username;
  this.post.img = this.username;
  this.post.date = this.username;
  this.api.updatePost(this.post).subscribe(res=>{
    this.ngOnInit();
  },err=>{
    console.log(err)
  })
}
}
