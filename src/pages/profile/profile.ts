// src/pages/profile/profile.ts

import {Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {PopoverController} from "ionic-angular";

@Component({
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // We need to inject AuthService so that we can
  // use it in the view
  constructor( public popoverCtrl: PopoverController,
               public auth: AuthService) {}


  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }

}
