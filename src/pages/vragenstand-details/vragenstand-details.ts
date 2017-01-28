import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-vragenstand-details',
  templateUrl: 'vragenstand-details.html'
})
export class VragenstandDetailsPage {
  vragenstandRegel : any;

  constructor(public navCtrl: NavController,
  private navParams: NavParams) {
    this.vragenstandRegel = navParams.get('vragenregel')
}

  ionViewDidLoad() {
    console.log('Hello VragenstandDetailsPage Page');
  }

}
