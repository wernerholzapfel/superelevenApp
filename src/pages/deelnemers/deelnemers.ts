import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {Deelnemer} from "../../models/deelnemers";
import {DeelnemerProvider} from "../../providers/deelnemersprovider";
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs/Subscription";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {PredictionPage} from "../prediction/prediction";

@IonicPage()
@Component({
  selector: 'page-deelnemers',
  templateUrl: 'deelnemers.html',
})
export class DeelnemersPage {

  deelnemers: Deelnemer[];
  deelnemersSub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private deelnemerProvider: DeelnemerProvider,
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.deelnemers = [];
    if (!this.deelnemers) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.deelnemersSub = this.deelnemerProvider.getDeelnemers().subscribe(
      response => {
        this.deelnemers = response;
        SpinnerDialog.hide();
      });
  }

  goToDetails(deelnemer: Deelnemer) {
    this.navCtrl.push(PredictionPage, {participant: deelnemer})
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeelnemersPage');
  }

  ionViewWillLeave() {
    this.deelnemersSub.unsubscribe();
  }

}
