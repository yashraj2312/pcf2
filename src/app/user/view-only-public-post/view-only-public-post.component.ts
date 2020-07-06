import { Component, OnInit } from '@angular/core';
import { ACrudService } from 'src/app/Authentication/shared/acrud.service';
import { AuthService } from 'src/app/Authentication/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-only-public-post',
  templateUrl: './view-only-public-post.component.html',
  styleUrls: ['./view-only-public-post.component.css']
})
export class ViewOnlyPublicPostComponent implements OnInit {
  unameParam: string;
  PublicPosts: any[];
  PrivatePosts: any[];

  pbcount: number=0
  prcount:number=0;
  allcount:number=0
  constructor(
    private acrud: ACrudService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let url = this.router.url;
    let urlpart = url.split("/")
    this.unameParam = urlpart[2]

    this.getUidFromService()
  }
  getUidFromService() {
    this.acrud.getPublicProfile(this.unameParam).subscribe(d => {
      let x = this.acrud.seprate(d)
      let y = x[0].id

      this.getPublicPostsFromProfileId(y)
      this.getPrivatePstsFromProfileId(y)

    })
  }
  getPrivatePstsFromProfileId(y: any) {
    this.acrud.getPrivateFromProfileId(y).subscribe(d=>{
      let x = this.acrud.seprate(d)
      
      //this.PublicPosts = x
      this.prcount = x.length
      this.allcount+=this.prcount
    })
  }
  getPublicPostsFromProfileId(y: any) {
    console.log(y)
    this.acrud.getPublicPostsFromProfileId(y).subscribe(d => {
      let x = this.acrud.seprate(d)
      
      this.PublicPosts = x
      this.pbcount = this.PublicPosts.length
      this.allcount+=this.pbcount
    })
  }

}
