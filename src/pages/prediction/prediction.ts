import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {PredictionProvider} from "../../providers/predictionProvider";
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs/Subscription";
import {OrderByPipe} from "../../app/orderby";
import {SuperelevenNavbarPage} from "../supereleven-navbar/supereleven-navbar";


// @IonicPage()
@Component({
  selector: 'page-prediction',
  templateUrl: 'prediction.html',
})
export class PredictionPage {
  voorspelling: any;
  voorspellingSub: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController,
              private predictionProvider: PredictionProvider,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PredictionPage' + this.navParams.data.participant.Participant.Name);
  }

  ionViewWillEnter() {
    // this.voorspelling = [];
    if (!this.voorspelling) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.voorspellingSub = this.predictionProvider.getVoorspelling(this.navParams.data.participant.Participant.Name).subscribe(
      response => {
        this.voorspelling = response;
        SpinnerDialog.hide();
      }
    );
  }

  ionViewWillLeave() {
    this.voorspellingSub.unsubscribe();
  }
}
