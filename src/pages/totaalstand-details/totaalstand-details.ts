import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OrderBy} from "../../app/orderby";

@Component({
  selector: 'page-totaalstand-details',
  templateUrl: 'totaalstand-details.html'
})
export class TotaalstandDetailsPage {
  totaalstandregel: any;
  showMenu = false;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.totaalstandregel = navParams.get('totaalstandregel');
  }

  toggleMenu(){
    if (this.showMenu == false)
    {
      this.showMenu = true;
    }
    else( this.showMenu = false);
  }

  toggleDetails(line) {
    if (line.showDetails) {
      line.showDetails = false;
    } else {
      line.showDetails = true;
    }
  }
  ionViewDidLoad() {
    console.log('Hello TotaalstandDetailsPage Page');
  }

}
