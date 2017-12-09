import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';

@Component({
  selector: 'page-wedstrijdenstand-details',
  templateUrl: 'wedstrijdenstand-details.html'
})
export class WedstrijdenstandDetailsPage {
  wedstrijdenstandRegel: any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public popoverCtrl: PopoverController) {
    this.wedstrijdenstandRegel = navParams.get('wedstrijdenregel')
  }

  ionViewDidLoad() {
    console.log('Hello WedstrijdenstandDetailsPage Page');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
