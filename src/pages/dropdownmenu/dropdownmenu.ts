import {Component} from "@angular/core";
import {NavController, ViewController} from "ionic-angular";
import {HomePage} from "../home/home";
import {TeamstandPage} from "../teamstand/teamstand";
import {TotaalstandPage} from "../totaalstand/totaalstand";
import {WedstrijdenstandPage} from "../wedstrijdenstand/wedstrijdenstand";
import {VragenstandPage} from "../vragenstand/vragenstand";
import {DeelnemersPage} from "../deelnemers/deelnemers";
import {SpelerstatistiekenPage} from "../spelerstatistieken/spelerstatistieken";

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

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('Hello DropdownmenuPage Page');
  }

  openHome() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(HomePage);

  }

  openTeamstand() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(TeamstandPage);
  }

  openWedstrijdenstand() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(WedstrijdenstandPage);
  }

  openTotaalstand() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(TotaalstandPage);
  }
  openVragenstand(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(VragenstandPage)
  }

  openDeelnemers(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(DeelnemersPage)
  }

  openSpelerstatistieken(){
    this.viewCtrl.dismiss();
    this.navCtrl.push(SpelerstatistiekenPage)
  }
}
