import {Component} from "@angular/core";
import {NavController, PopoverController, ViewController, Platform} from "ionic-angular";
import {Nummereentotaalstand} from "../../models/nummereentotaalstand";
import {Homepageprovider} from "../../providers/homepageprovider";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";
import {Laatsteupdate} from "../../models/laatsteupdate";
import {Nummereenteamstandlaatsteronde} from "../../models/Nummereenteamstandlaatsteronde";
import {Subscription} from "rxjs";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {Headlines} from "../../models/headlines"
import { SpinnerDialog} from 'ionic-native';

declare var AdMob: any;

/*
 Generated class for the Home page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nummereentotaalstand: Nummereentotaalstand;
  laatsteupdate: Laatsteupdate;
  nummereenteamstandlaatsteronde: Nummereenteamstandlaatsteronde;
  nummereentotaalstandSub: Subscription;
  nummereenteamstandlaatsterondeSub: Subscription;
  headline : Headlines;
  LaatsteupdateSub: Subscription;
  headlinesSub: Subscription;
  private admobId: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private homepageProvider: Homepageprovider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController,
              private platform: Platform) {

    this.platform = platform;
    if(/(android)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-4938627038388421/4360126395',
        interstitial: 'ca-app-pub-4938627038388421/5557657998'
      };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
      this.admobId = {
        banner: 'ca-app-pub-4938627038388421/4360126395',
        interstitial: 'ca-app-pub-4938627038388421/5557657998'
      };
    }
  }

  createBanner() {
    this.platform.ready().then(() => {
      if(AdMob) {
        AdMob.createBanner({
          adId: this.admobId.banner,
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          isTesting: true,
          autoShow: true
        });
      }
    });
  }


  //
  // showBanner(position) {
  //   this.platform.ready().then(() => {
  //     if(AdMob) {
  //       let positionMap = {
  //         "bottom": AdMob.AD_POSITION.BOTTOM_CENTER,
  //         "top": AdMob.AD_POSITION.TOP_CENTER
  //       };
  //       AdMob.showBanner(positionMap[position.toLowerCase()]);
  //     }
  //   });
  // }
  //
  // hideBanner(position) {
  //   this.platform.ready().then(() => {
  //     if(AdMob) {
  //       AdMob.hideBanner();
  //     }
  //   });
  // }

  ionViewWillEnter() {
    if(!this.nummereentotaalstand) SpinnerDialog.show();
    this.viewCtrl.showBackButton(false);

    this.nummereentotaalstandSub = this.homepageProvider.getnummereentotaalstand().subscribe(response => {
      // console.log(response);
      this.nummereentotaalstand = response;
      SpinnerDialog.hide();
    });

    this.nummereenteamstandlaatsterondeSub = this.homepageProvider.getnummereenweekstand().subscribe(response => {
      // console.log(response);
      this.nummereenteamstandlaatsteronde = response
    });

    this.LaatsteupdateSub = this.laatsteupdateProvider.load().subscribe(response => {
      // console.log(response);
      this.laatsteupdate = response;
    });

    this.headlinesSub = this.homepageProvider.getheadlines().subscribe(response => {
      // console.log(response);
      this.headline = response[0]
    });

    this.createBanner();
  }

  ionViewWillLeave() {
    this.nummereentotaalstandSub.unsubscribe();
    this.nummereenteamstandlaatsterondeSub.unsubscribe();
    this.LaatsteupdateSub.unsubscribe();
    this.headlinesSub.unsubscribe()
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
    AdMob.onAdDismiss()
      .subscribe(() => { console.log('User dismissed ad'); });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
