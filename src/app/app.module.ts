import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

import { TeamstandPage } from '../pages/teamstand/teamstand';
import { TotaalstandPage } from '../pages/totaalstand/totaalstand';

import {TotaalstandProvider} from '../providers/totaalstandProvider';
import {TeamstandProvider} from "../providers/teamstandprovider";
import {TotaalstandDetailsPage} from "../pages/totaalstand-details/totaalstand-details";
import {TeamstandDetailsPage} from "../pages/teamstand-details/teamstand-details";
import {LaatsteupdateProvider} from "../providers/laatsteupdateprovider";
import {TabsPage} from "../pages/tabs/tabs";
import {Homepageprovider} from "../providers/homepageprovider";
import {HomePage} from "../pages/home/home";
import {OrderByPipe} from "./orderby";
import {TakePipe} from "./take.pipe";
import {DropdownmenuPage} from "../pages/dropdownmenu/dropdownmenu";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '800f2066'
  },  'push': {
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true,
        'clearBadge' : true,
        'alert': true
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    TeamstandPage,
    TeamstandDetailsPage,
    TotaalstandPage,
    TotaalstandDetailsPage,
    TabsPage,
    HomePage,
    DropdownmenuPage,
    OrderByPipe,
    TakePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      iconMode: 'md',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios',
      popoverEnter: 'popover-md-pop-in',
      popoverLeave: 'popover-md-pop-out'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamstandPage,
    TeamstandDetailsPage,
    TotaalstandPage,
    TotaalstandDetailsPage,
    TabsPage,
    HomePage,
    DropdownmenuPage
  ],
  providers: [TotaalstandProvider,TeamstandProvider,LaatsteupdateProvider,Homepageprovider]
})
export class AppModule {}
