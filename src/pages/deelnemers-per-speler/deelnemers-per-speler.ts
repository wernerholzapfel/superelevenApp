import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs/Subscription";
import {DeelnemersPerSpelerProvider} from "../../providers/deelnemers-per-speler/deelnemers-per-speler";


@IonicPage()
@Component({
  selector: 'page-deelnemers-per-speler',
  templateUrl: 'deelnemers-per-speler.html',
})
export class DeelnemersPerSpelerPage {
  deelnemersPerSpeler: any;
  deelnemersPerSpelerSub: Subscription;
  naamGekozenSpeler: string;

  constructor(public navCtrl: NavController,private deelnemersPerSpelerProvider: DeelnemersPerSpelerProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeelnemersPerSpelerPage');
  }


  ionViewWillEnter() {
    // this.voorspelling = [];
    if (!this.deelnemersPerSpeler) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.deelnemersPerSpelerSub = this.deelnemersPerSpelerProvider.getDeelnemerPerSpeler(this.navParams.data.PlayerId).subscribe(
      response => {
        this.deelnemersPerSpeler = response;
        this.naamGekozenSpeler = response[0].LatestTeam.Name;
        SpinnerDialog.hide();
      }
    );
  }

  ionViewWillLeave() {
    this.deelnemersPerSpelerSub.unsubscribe();
  }
}
