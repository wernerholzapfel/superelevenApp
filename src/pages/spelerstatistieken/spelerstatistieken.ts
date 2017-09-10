import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {SpinnerDialog} from "ionic-native";
import {SpelerstatistiekenProvider} from "../../providers/spelerstatistieken/spelerstatistieken";
import {Subscription} from "rxjs/Subscription";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {DeelnemersPerSpelerPage} from "../deelnemers-per-speler/deelnemers-per-speler";

/**
 * Generated class for the SpelerstatistiekenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-spelerstatistieken',
  templateUrl: 'spelerstatistieken.html',
})
export class SpelerstatistiekenPage {

  unmutatedSpelerlijst: any[];
  spelerlijst: any[];
  spelerlijstSub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private spelerstatistiekenProvider: SpelerstatistiekenProvider,
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.spelerlijst = [];
    if (!this.spelerlijst) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.spelerlijstSub = this.spelerstatistiekenProvider.getSpelerslijst().subscribe(
      response => {
        this.spelerlijst = response;
        this.unmutatedSpelerlijst = response;
        SpinnerDialog.hide();
      });
  }

  goToDetails(deelnemersPerSpeler: any) {

    this.navCtrl.push(DeelnemersPerSpelerPage, deelnemersPerSpeler)
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeelnemersPage');
  }

  ionViewWillLeave() {
    this.spelerlijstSub.unsubscribe();
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.spelerlijst = this.unmutatedSpelerlijst.filter((item) => {
        return (item.PlayerName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else this.spelerlijst = this.unmutatedSpelerlijst
  }
}
