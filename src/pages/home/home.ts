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
import {AuthService} from "../../services/auth/auth";


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
  personalScore : string;
  LaatsteupdateSub: Subscription;
  headlinesSub: Subscription;
  personalScoreSub: Subscription;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private homepageProvider: Homepageprovider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController,
              public auth: AuthService) {
  }

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

    this.personalScoreSub = this.homepageProvider.getPersonalScore().subscribe(response => {
      console.log(response);
      this.personalScore = response
    });
  }

  ionViewWillLeave() {
    this.nummereentotaalstandSub.unsubscribe();
    this.nummereenteamstandlaatsterondeSub.unsubscribe();
    this.LaatsteupdateSub.unsubscribe();
    this.headlinesSub.unsubscribe();
    this.personalScoreSub.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');

  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
