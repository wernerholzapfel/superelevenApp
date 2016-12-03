import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-teamstand-details',
  templateUrl: 'teamstand-details.html'
})
export class TeamstandDetailsPage {
  teamstandregel: any;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.teamstandregel = navParams.get('teamstandregel');
  }

  ionViewDidLoad() {
    console.log('Hello TeamstandDetailsPage Page');
  }

}



