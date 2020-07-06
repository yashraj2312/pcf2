import { Component, OnInit } from '@angular/core';
import { ACrudService } from 'src/app/Authentication/shared/acrud.service';
import { ProfileComponent } from '../profile/profile.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Authentication/shared/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  unameParam: string
  ProfileData: any
  username: string;
  isAuthenticated = false;
  myuname: string
  isloading: boolean = true;
  private userSub: Subscription;
  ismyself: boolean = false


  pbcount: number = 0
  prcount: number = 0;
  allcount: number = 0

  constructor(
    private acrud: ACrudService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit(): void {

   

    this.userSub = this.authService.user.subscribe(user => {
      //console.log(user)
      if (user) {
        this.isAuthenticated = !!user;
        console.log(user.id)
      }
    
    });


 

    this.route.params
      .subscribe(
        (params: Params) => {
          this.unameParam = params['username'];

          this.getUidFromService()


          if (this.isAuthenticated) {
            this.acrud.getProfile().subscribe(d => {
              let x = this.acrud.seprate(d)

              this.myuname = x[0].uname
              if (this.myuname == this.unameParam) {
                this.ismyself = true;
                this.getPrfoileFromPersonalDb()
              }
              else {
                this.ismyself = false
                this.getPrfoileFromPublicDb()
              }
            })


          }
          if (!this.isAuthenticated) {
            this.ismyself = false
            this.getPrfoileFromPublicDb()
            // console.log("hello")
          }
       

        })

  





  }
  getPrfoileFromPublicDb() {
    this.isloading = true
    console.log(this.unameParam)
    this.acrud.getPublicProfile(this.unameParam).subscribe(d => {
      console.log(d)
      let x = this.acrud.seprate(d)
      this.ProfileData = x[0]
      this.isloading = false
    })
  }
  getPrfoileFromPersonalDb() {
    this.isloading = true
    this.acrud.getProfile().subscribe(d => {


      let x = this.acrud.seprate(d)
      this.ProfileData = x[0]
      this.username = this.ProfileData.uname
      console.log(this.username)
      console.log(this.ProfileData.name)
      this.isloading = false

    })
  }

  getUidFromService() {
   
    this.acrud.getPublicProfile(this.unameParam).subscribe(d => {
      let x = this.acrud.seprate(d)
      console.log(x)
      if (x[0]) {
        let y = x[0].id

        this.getPublicPostsFromProfileId(y)
        this.getPrivatePostsFromProfileId(y)

      }
      else {
        this.router.navigate(["home"])
      }

    
    })
  }
  getPrivatePostsFromProfileId(y: any) {
    
    this.acrud.getPrivateFromProfileId(y).subscribe(d => {
      let x = this.acrud.seprate(d)


      //this.PublicPosts = x
      this.prcount = x.length
      this.allcount += this.prcount
     
    })

  }
  getPublicPostsFromProfileId(y: any) {
   
    console.log(y)
    this.acrud.getPublicPostsFromProfileId(y).subscribe(d => {
      let x = this.acrud.seprate(d)

      //this.PublicPosts = x
      this.pbcount = x.length
      this.allcount += this.pbcount
     
    })
  }


  ngOnDestroy() {
  /*   this.userSub.unsubscribe();

    console.log("user Destroyed") */

  }
}
