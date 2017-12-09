import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';


@Component({
  selector: 'page-vragenstand-details',
  templateUrl: 'vragenstand-details.html'
})
export class VragenstandDetailsPage {
  vragenstandRegel : any;

  constructor(public navCtrl: NavController,
  private navParams: NavParams,
  public popoverCtrl: PopoverController
) {
    this.vragenstandRegel = navParams.get('vragenregel')
}

  ionViewDidLoad() {
    console.log('Hello VragenstandDetailsPage Page');
  }
  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
