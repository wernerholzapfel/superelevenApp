import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { DeelnemersPage } from './deelnemers';

@NgModule({
  declarations: [
    DeelnemersPage,
  ],
  imports: [
    IonicPageModule.forChild(DeelnemersPage),
  ],
  exports: [
    DeelnemersPage
  ]
})
export class DeelnemersPageModule {}
