import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {OrderByPipe} from "../../app/orderby";
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';

@Component({
  selector: 'page-totaalstand-details',
  templateUrl: 'totaalstand-details.html',
})
export class TotaalstandDetailsPage {
  totaalstandregel: any;
  constructor(public navCtrl: NavController, private navParams: NavParams, public popoverCtrl: PopoverController,
  ) {
    this.totaalstandregel = navParams.get('totaalstandregel');
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
  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
