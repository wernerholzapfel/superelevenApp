import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Nummereentotaalstand} from "../../models/nummereentotaalstand";
import {Homepageprovider} from "../../providers/homepageprovider";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";
import {Laatsteupdate} from "../../../.tmp/models/laatsteupdate";
import {Nummereenteamstandlaatsteronde} from "../../models/Nummereenteamstandlaatsteronde";

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nummereentotaalstand: Nummereentotaalstand;
  laatsteupdate: Laatsteupdate;
  nummereenteamstandlaatsteronde : Nummereenteamstandlaatsteronde;

  constructor(public navCtrl: NavController, private homepageProvider: Homepageprovider,
              private laatsteupdateProvider: LaatsteupdateProvider) {

    homepageProvider.getnummereentotaalstand().subscribe(response => {
      console.log(response);
      this.nummereentotaalstand = response
    });

    homepageProvider.getnummereenweekstand().subscribe(response => {
      console.log(response);
      this.nummereenteamstandlaatsteronde = response
    });

    laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });

  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

}
