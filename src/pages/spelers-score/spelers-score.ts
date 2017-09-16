import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {SpelerstatistiekenProvider} from "../../providers/spelerstatistieken/spelerstatistieken";
import {DeelnemersPerSpelerPage} from "../deelnemers-per-speler/deelnemers-per-speler";
import {SpinnerDialog} from "ionic-native";
import {SpelersScoreProvider} from "../../providers/spelers-score/spelers-score";
import {TeamstandProvider} from "../../providers/teamstandprovider";

// @IonicPage()
@Component({
  selector: 'page-spelers-score',
  templateUrl: 'spelers-score.html',
})
export class SpelersScorePage {

  searchTerm: string = '';
  searchControl: FormControl;

  unmutatedSpelerlijst: any[];
  spelerlijst: any[];
  spelerlijstSub: Subscription;

  teamstandSub: Subscription;
  speelrondeList: any[];
  activeSpeelronde: number;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private teamstandProvider: TeamstandProvider,
              private spelersScoreProvider: SpelersScoreProvider,
              ) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
    this.spelerlijst = [];
    if (!this.spelerlijst) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.teamstandSub = this.teamstandProvider.getLatestRound().subscribe(speelRondes => {
      this.speelrondeList = speelRondes;
      if (!this.activeSpeelronde) {
        this.activeSpeelronde = this.speelrondeList.length;
      }
      this.spelerlijstSub = this.spelersScoreProvider.getSpelerslijstPerRound(this.activeSpeelronde).subscribe(
        response => {
          this.spelerlijst = response;
          this.unmutatedSpelerlijst = response;
          this.setFilteredItems();
          this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
            this.setFilteredItems();

          });
          SpinnerDialog.hide();
      });
    });
  }

  ionViewWillLeave() {
    this.spelerlijstSub.unsubscribe();
    this.teamstandSub.unsubscribe();
  }

  setFilteredItems() {
    this.spelerlijst = this.filterItems(this.searchTerm);
    SpinnerDialog.hide();
  }

  filterItems(searchTerm) {
    return this.unmutatedSpelerlijst.filter((item) => {
      return (item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.Team.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });
  }

  onSearchInput() {
    SpinnerDialog.show();
  }

  getSpelerslijst(event) {
    SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    if (event === 'Alle'){
      this.spelersScoreProvider.getSpelerslijst().subscribe(response => {
        console.log("get gesommeerde spelerslijst");
        this.unmutatedSpelerlijst = response;
        this.spelerlijst = response;
        SpinnerDialog.hide();
      });
    }
    else {
    this.spelersScoreProvider.getSpelerslijstPerRound(this.activeSpeelronde).subscribe(response => {
      console.log("get spelerslijst call");
      this.unmutatedSpelerlijst = response;
      this.spelerlijst = response;
      SpinnerDialog.hide();
    });
  }}
}



