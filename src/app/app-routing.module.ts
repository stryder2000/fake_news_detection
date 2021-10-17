import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router' // enables routing

import {PicUploadComponent} from './pic-upload/pic-upload.component'
import { VidUploadComponent } from './vid-upload/vid-upload.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
/*import {PostCreateComponent} from './posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { FarmCallComponent } from './farm-call/farm-call.component';*/

const routes : Routes = [

    {path:'', component : LandingPageComponent},// structure of routing
    {path:'picupload', component : PicUploadComponent, },
    {path:'vidupload', component : VidUploadComponent },

];

@NgModule({
  imports :[RouterModule.forRoot(routes)], // to make anglar router aware of our routes
  exports :[RouterModule], // so that route config can be used outside of this file
  //providers :[AuthGuard]
})

export class AppRoutingModule{};
