import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router' // enables routing

import { LandingPageComponent } from './landing-page/landing-page.component';
import { ScannerComponent } from './scanner/scanner.component';

const loginState = localStorage.getItem('loggedIn');

let routes : Routes = [

    {path:'', component : LandingPageComponent}

];

if(loginState == 'true'){
  routes = [
    {path:'', component : LandingPageComponent},
    {path:'scanner', component : ScannerComponent, }
  ]
}

@NgModule({
  imports :[RouterModule.forRoot(routes)], // to make anglar router aware of our routes
  exports :[RouterModule], // so that route config can be used outside of this file
  //providers :[AuthGuard]
})

export class AppRoutingModule{};
