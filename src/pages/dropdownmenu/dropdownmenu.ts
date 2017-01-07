import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {TeamstandPage} from "../teamstand/teamstand";
import {TotaalstandPage} from "../totaalstand/totaalstand";

/*
 Generated class for the Dropdownmenu page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-dropdownmenu',
  templateUrl: 'dropdownmenu.html'
})
export class DropdownmenuPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('Hello DropdownmenuPage Page');
  }

  openHome() {
    this.navCtrl.push(HomePage)
  }

  openTeamstand() {
    this.navCtrl.push(TeamstandPage)

  }

  openTotaalstand() {
    this.navCtrl.push(TotaalstandPage)
  }
}
