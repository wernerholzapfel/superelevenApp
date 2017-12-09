import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {PredictionProvider} from "../../providers/predictionProvider";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {Subscription} from "rxjs/Subscription";
import {OrderByPipe} from "../../app/orderby";
import {SuperelevenNavbarPage} from "../supereleven-navbar/supereleven-navbar";
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';


// @IonicPage()
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html',
})
export class PredictionPage {
  voorspelling: any;
  voorspellingSub: Subscription;
isLoading: boolean
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private predictionProvider: PredictionProvider,
              public popoverCtrl: PopoverController,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictionPage' + this.navParams.data.participant.Participant.Name);
  }

  ionViewWillEnter() {
    // this.voorspelling = [];
    if (!this.voorspelling) this.isLoading = true;

    this.voorspellingSub = this.predictionProvider.getVoorspelling(this.navParams.data.participant.Participant.Name).subscribe(
      response => {
        this.voorspelling = response;
        this.isLoading = false;
      }
    );
  }

  ionViewWillLeave() {
    this.voorspellingSub.unsubscribe();
  }
  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
