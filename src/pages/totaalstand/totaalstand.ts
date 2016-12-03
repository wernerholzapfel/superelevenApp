import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Totaalstand, deelnemers} from "../../models/totaalstand";
import {TotaalstandProvider} from "../../providers/totaalstandProvider";
import {TotaalstandDetailsPage} from "../totaalstand-details/totaalstand-details";

@Component({
  selector: 'page-totaalstand',
  templateUrl: 'totaalstand.html'
})
export class TotaalstandPage {
  totaalstand: Totaalstand[];
  deelnemers: deelnemers[];
  constructor(public navCtrl: NavController, private totaalstandProvider: TotaalstandProvider) {
    totaalstandProvider.load().subscribe(response => {
      console.log(response);
      this.totaalstand = response;
      // this.deelnemers = this.totaalstand.deelnemers;
    })
  }

  goToDetails(totaalstandregel: any){
    this.navCtrl.push(TotaalstandDetailsPage, {totaalstandregel})
  }
  ionViewDidLoad() {
    console.log('Hello totaalstandPage Page');
  }
}
