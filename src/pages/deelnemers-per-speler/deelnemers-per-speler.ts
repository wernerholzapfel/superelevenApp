import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {Subscription} from 'rxjs/Subscription';
import {DeelnemersPerSpelerProvider} from '../../providers/deelnemers-per-speler/deelnemers-per-speler';


// @IonicPage()
@Component({
  selector: 'page-deelnemers-per-speler',
  templateUrl: 'deelnemers-per-speler.html',
})
export class DeelnemersPerSpelerPage {
  deelnemersPerSpeler: any;
  deelnemersPerSpelerSub: Subscription;
  naamGekozenSpeler: string;
  isLoading: boolean;
  constructor(public navCtrl: NavController, private deelnemersPerSpelerProvider: DeelnemersPerSpelerProvider,
              public navParams: NavParams,
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeelnemersPerSpelerPage');
  }


  ionViewWillEnter() {
    if (!this.deelnemersPerSpeler) this.isLoading = true;

    this.deelnemersPerSpelerSub = this.deelnemersPerSpelerProvider.getDeelnemerPerSpeler(this.navParams.data.PlayerId).subscribe(
      response => {
        this.deelnemersPerSpeler = response;
        this.naamGekozenSpeler = response[0].LatestTeam.Name;
        this.isLoading = false;
      }
    );
  }

  ionViewWillLeave() {
    this.deelnemersPerSpelerSub.unsubscribe();
  }
}
