import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router' // enables routing

import { PicUploadComponent } from './pic-upload/pic-upload.component'
import { VidUploadComponent } from './vid-upload/vid-upload.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const loginState = localStorage.getItem('loggedIn');

let routes : Routes = [

    {path:'', component : LandingPageComponent}

];

if(loginState == 'true'){
  routes = [
    {path:'', component : LandingPageComponent},
    {path:'picupload', component : PicUploadComponent, },
    {path:'vidupload', component : VidUploadComponent }
  ]
}

@NgModule({
  imports :[RouterModule.forRoot(routes)], // to make anglar router aware of our routes
  exports :[RouterModule], // so that route config can be used outside of this file
  //providers :[AuthGuard]
})

export class AppRoutingModule{};
