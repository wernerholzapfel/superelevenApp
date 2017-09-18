import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
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
import {Http, HttpModule} from '@angular/http';
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
import {AuthService} from "../services/auth.services";
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {Storage} from '@ionic/storage';

// let storage = new Storage({});
//
// export function getAuthHttp(http) {
//   return new AuthHttp(new AuthConfig({
//     headerPrefix: 'bearer',
//     noJwtError: true,
//     globalHeaders: [{'Accept': 'application/json'}],
//     tokenGetter: (() => storage.get('id_token').then((token: string) => token)),
//   }), http);
// }


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
    AuthService
    // {
    //   provide: AuthHttp,
    //   useFactory: getAuthHttp,
    //   deps: [Http]
    // }
  ]
})
export class AppModule {
}
