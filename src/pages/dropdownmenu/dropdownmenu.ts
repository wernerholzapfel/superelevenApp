import {Component} from "@angular/core";
import {App, NavController, ViewController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {TeamstandPage} from "../teamstand/teamstand";
import {TotaalstandPage} from "../totaalstand/totaalstand";
import {WedstrijdenstandPage} from "../wedstrijdenstand/wedstrijdenstand";
import {VragenstandPage} from "../vragenstand/vragenstand";
import {DeelnemersPage} from "../deelnemers/deelnemers";
import {SpelerstatistiekenPage} from "../spelerstatistieken/spelerstatistieken";
import {SpelersScorePage} from "../spelers-score/spelers-score";

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

  constructor( public appCtrl: App,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('Hello DropdownmenuPage Page');
  }

  openHome() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(HomePage);
  }

  openTeamstand() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(TeamstandPage);
    }

  openWedstrijdenstand() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(WedstrijdenstandPage);
  }

  openTotaalstand() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(TotaalstandPage);
  }
  openVragenstand(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(VragenstandPage);
  }

  openDeelnemers(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(DeelnemersPage);
  }

  openSpelerstatistieken(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(SpelerstatistiekenPage);
  }

  openSpelerscore(){
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(SpelersScorePage);
  }
}
