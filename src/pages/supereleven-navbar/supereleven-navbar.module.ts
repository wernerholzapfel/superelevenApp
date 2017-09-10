import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperelevenNavbarPage } from './supereleven-navbar';

@NgModule({
  declarations: [
    SuperelevenNavbarPage,
  ],
  imports: [
    IonicPageModule.forChild(SuperelevenNavbarPage),
  ],
  exports: [
    SuperelevenNavbarPage
  ]
})
export class SuperelevenNavbarPageModule {}
