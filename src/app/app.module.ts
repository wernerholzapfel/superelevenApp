import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
// import {CloudModule, CloudSettings} from "@ionic/cloud-angular";
import {MyApp} from "./app.component";
import {TeamstandPage} from "../pages/teamstand/teamstand";
import {TotaalstandPage} from "../pages/totaalstand/totaalstand";
import {TotaalstandProvider} from "../providers/totaalstandProvider";
import {TeamstandProvider} from "../providers/teamstandprovider";
import {TotaalstandDetailsPage} from "../pages/totaalstand-details/totaalstand-details";
import {TeamstandDetailsPage} from "../pages/teamstand-details/teamstand-details";
import {LaatsteupdateProvider} from "../providers/laatsteupdateprovider";
import {WedstrijdenstandProvider} from "../providers/wedstrijdenstandprovider";
import {TabsPage} from "../pages/tabs/tabs";
import {Homepageprovider} from "../providers/homepageprovider";
import {HomePage} from "../pages/home/home";
import {OrderByPipe} from "./orderby";
import {TakePipe} from "./take.pipe";
import {DropdownmenuPage} from "../pages/dropdownmenu/dropdownmenu";
import {WedstrijdenstandPage} from "../pages/wedstrijdenstand/wedstrijdenstand";
import {WedstrijdenstandDetailsPage} from "../pages/wedstrijdenstand-details/wedstrijdenstand-details";
import {VragenstandPage} from "../pages/vragenstand/vragenstand";
import {VragenstandProvider} from "../providers/vragenstandprovider";
import {VragenstandDetailsPage} from "../pages/vragenstand-details/vragenstand-details";
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {DeelnemersPage} from "../pages/deelnemers/deelnemers";
import {DeelnemerProvider} from '../providers/deelnemersprovider';
import {PredictionPage} from "../pages/prediction/prediction";
import {PredictionProvider} from '../providers/predictionProvider';
import {SpelerstatistiekenProvider} from '../providers/spelerstatistieken/spelerstatistieken';
import {SpelerstatistiekenPage} from "../pages/spelerstatistieken/spelerstatistieken";
import {DeelnemersPerSpelerPage} from "../pages/deelnemers-per-speler/deelnemers-per-speler";
import {DeelnemersPerSpelerProvider} from '../providers/deelnemers-per-speler/deelnemers-per-speler';
import {SuperelevenNavbarPage} from "../pages/supereleven-navbar/supereleven-navbar";
import {SuperelevenNavbarPageModule} from "../pages/supereleven-navbar/supereleven-navbar.module";
import {SpelersScoreProvider} from '../providers/spelers-score/spelers-score';
import {SpelersScorePage} from "../pages/spelers-score/spelers-score";
import {IonAffixModule} from "ion-affix";
import {StatusBar} from "@ionic-native/status-bar";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";

// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '800f2066'
//   }, 'push': {
//     'sender_id': 'AAAAPHn_vFg:APA91bErCBmvhhJvkOeUstTD1DsqtGpfm6vQ7rk7m-Tib1njLfa7fEVJj60LlN5PZL28c6ySe6xsJXLlpFMzihwmJFFVM1mw8QzmZSi0tQJnGlaucTdqC2v-2XUropTC0JAx3CWaD_uW',
//     'pluginConfig': {
//       'ios': {
//         'badge': true,
//         'sound': true,
//         'clearBadge': true,
//         'alert': true
//       }
//     }
//   }
// };

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
    WedstrijdenstandPage,
    WedstrijdenstandDetailsPage,
    VragenstandPage,
    VragenstandDetailsPage,
    OrderByPipe,
    TakePipe,
    DeelnemersPage,
    PredictionPage,
    SpelerstatistiekenPage,
    DeelnemersPerSpelerPage,
    //SuperelevenNavbarPage,
    SpelersScorePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    SuperelevenNavbarPageModule,
    // CloudModule.forRoot(cloudSettings),
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
    }),
    IonAffixModule
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
    DropdownmenuPage,
    WedstrijdenstandPage,
    WedstrijdenstandDetailsPage,
    VragenstandPage,
    VragenstandDetailsPage,
    DeelnemersPage,
    PredictionPage,
    SpelerstatistiekenPage,
    DeelnemersPerSpelerPage,
    SuperelevenNavbarPage,
    SpelersScorePage
  ],
  providers: [
    TotaalstandProvider,
    TeamstandProvider,
    LaatsteupdateProvider,
    Homepageprovider,
    WedstrijdenstandProvider,
    VragenstandProvider,
    DeelnemerProvider,
    PredictionProvider,
    SpelerstatistiekenProvider,
    DeelnemersPerSpelerProvider,
    SpelersScoreProvider,
    StatusBar,
    SpinnerDialog]
})
export class AppModule {
}
