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
import {SuperelevenNavbarPage} from "../supereleven-navbar/supereleven-navbar";

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

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private homepageProvider: Homepageprovider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController,
              private platform: Platform) {

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


  }

  ionViewWillLeave() {
    this.nummereentotaalstandSub.unsubscribe();
    this.nummereenteamstandlaatsterondeSub.unsubscribe();
    this.LaatsteupdateSub.unsubscribe();
    this.headlinesSub.unsubscribe()
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
