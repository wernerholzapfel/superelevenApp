import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-totaalstand-details',
  templateUrl: 'totaalstand-details.html'
})
export class TotaalstandDetailsPage {
  totaalstandregel: any;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.totaalstandregel = navParams.get('totaalstandregel');
  }

  ionViewDidLoad() {
    console.log('Hello TotaalstandDetailsPage Page');
  }

}
