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

  toggleDetails(line) {
    console.log("toggle details" + line);
    if (line.showDetails) {
      line.showDetails = false;
      // data.icon = 'ios-add-circle-outline';
    } else {
      line.showDetails = true;
      // data.icon = 'ios-remove-circle-outline';
    }
  }

  ionViewDidLoad() {
    console.log('Hello TeamstandDetailsPage Page');
  }

}



