import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UCreatePostComponent } from './Unauthenticated/u-create-post/u-create-post.component';
import { UPostDetailComponent } from './Unauthenticated/upost-detail/upost-detail.component';
import { HomeComponent } from './Unauthenticated/home/home.component';
import { AuthComponentComponent } from './Authentication/auth-component/auth-component.component';
import { UserPostComponent } from './user/user-post/user-post.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ViewProfileComponent } from './user/view-profile/view-profile.component';
import { ViewOnlyPublicPostComponent } from './user/view-only-public-post/view-only-public-post.component';
import { AuthGuard } from './Authentication/shared/auth-guard.service';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: UPostDetailComponent ,pathMatch: 'full'},
  { path: 'myprofile', component: ProfileComponent ,pathMatch: 'full',canActivate: [AuthGuard]},
  
  { path: 'myprofile/:username', component: ViewProfileComponent ,pathMatch: 'full'},
  { path: 'myprofile/:username/editProfile', component: ProfileComponent ,canActivate: [AuthGuard]},
  { path: 'myprofile/:username/publicposts', component: ViewOnlyPublicPostComponent},
  { path: 'myprofile/:username/publicposts/:id', component: UPostDetailComponent},
  { path: 'create-post', component: UCreatePostComponent },
  { path: 'auth', component: AuthComponentComponent },
  { path: 'myposts', redirectTo: 'myposts/allpost', pathMatch: 'full' },
  { path: 'myposts/:type', component: UserPostComponent,pathMatch: 'full'  },
 
  { path: 'myposts/:type/:id', component: UPostDetailComponent },
  { path: 'myposts/:type/:id/edit', component: UserEditComponent },
  
  {path: '**/undefined', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
