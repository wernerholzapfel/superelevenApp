import {Component} from "@angular/core";
import {NavController, ViewController, Platform} from "ionic-angular";
import {HomePage} from "../home/home";
import {TeamstandPage} from "../teamstand/teamstand";
import {TotaalstandPage} from "../totaalstand/totaalstand";
import {AuthService} from "../../services/auth/auth";
import {ProfilePage} from "../profile/profile";

declare var AdMob: any;

/*
 Generated class for the Dropdownmenu page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-dropdownmenu',
  templateUrl: 'dropdownmenu.html'
})
export class DropdownmenuPage {
  private admobId: any;

  constructor(public navCtrl: NavController,
  public viewCtrl : ViewController,private platform: Platform,public auth: AuthService) {

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

  ionViewDidLoad() {
    console.log('Hello DropdownmenuPage Page');
  }

  showInterstitial() {
    this.platform.ready().then(() => {
      if(AdMob) {
        AdMob.prepareInterstitial({
          adId: this.admobId.interstitial,
          autoShow: true
          ,isTesting: true
        });
      }
    });
  }

  openHome() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(HomePage);

  }

  openTeamstand() {
    this.viewCtrl.dismiss();
    // this.showInterstitial();
    this.navCtrl.push(TeamstandPage);
  }

  openProfile(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(ProfilePage);

  }
  openTotaalstand() {
    this.viewCtrl.dismiss();
    // this.showInterstitial();
    this.navCtrl.push(TotaalstandPage);
  }
}
