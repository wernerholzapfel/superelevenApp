import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-totaalstand-details',
  templateUrl: 'totaalstand-details.html'
})
export class TotaalstandDetailsPage {
  login: string;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.login = navParams.get('login');
  }

  ionViewDidLoad() {
    console.log('Hello TotaalstandDetailsPage Page');
  }

}
