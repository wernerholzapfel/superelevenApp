import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

import { TeamstandPage } from '../pages/teamstand/teamstand';
import { TotaalstandPage } from '../pages/totaalstand/totaalstand';

import {TotaalstandProvider} from '../providers/totaalstandProvider';
import {TeamstandProvider} from "../providers/teamstandprovider";
import {TotaalstandDetailsPage} from "../pages/totaalstand-details/totaalstand-details";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '800f2066'
  }
};

@NgModule({
  declarations: [
    MyApp,
    TeamstandPage,
    TotaalstandPage,
    TotaalstandDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamstandPage,
    TotaalstandPage,
    TotaalstandDetailsPage
  ],
  providers: [TotaalstandProvider,TeamstandProvider]
})
export class AppModule {}
