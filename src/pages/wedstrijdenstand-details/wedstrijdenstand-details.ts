import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-wedstrijdenstand-details',
  templateUrl: 'wedstrijdenstand-details.html'
})
export class WedstrijdenstandDetailsPage {
  wedstrijdenstandRegel : any;
  constructor(public navCtrl: NavController,
  private navParams : NavParams) {
    this.wedstrijdenstandRegel = navParams.get('wedstrijdenregel')
  }

  ionViewDidLoad() {
    console.log('Hello WedstrijdenstandDetailsPage Page');
  }

}
