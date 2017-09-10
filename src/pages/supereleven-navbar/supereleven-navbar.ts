import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";

/**
 * Generated class for the SuperelevenNavbarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'supereleven-navbar',
  templateUrl: 'supereleven-navbar.html',
})
export class SuperelevenNavbarPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuperelevenNavbarPage');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }

}
