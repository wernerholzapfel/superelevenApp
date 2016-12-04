import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Totaalstand} from "../../models/totaalstand";
import {TotaalstandProvider} from "../../providers/totaalstandProvider";
import {TotaalstandDetailsPage} from "../totaalstand-details/totaalstand-details";
import {Laatsteupdate} from "../../models/laatsteupdate";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";

@Component({
  selector: 'page-totaalstand',
  templateUrl: 'totaalstand.html'
})
export class TotaalstandPage {
  totaalstand: Totaalstand;
  laatsteupdate: Laatsteupdate;

  constructor(public navCtrl: NavController, private totaalstandProvider: TotaalstandProvider, private laatsteupdateProvider: LaatsteupdateProvider) {
    totaalstandProvider.load().subscribe(response => {
      console.log(response);
      this.totaalstand = response;
    });

    laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.totaalstandProvider.load().subscribe(response => {
      this.totaalstand = response;
    });
    this.laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });
    refresher.complete();
  }

  goToDetails(totaalstandregel: any) {
    this.navCtrl.push(TotaalstandDetailsPage, {totaalstandregel})
  }

  ionViewDidLoad() {
    console.log('Hello totaalstandPage Page');
  }
}
