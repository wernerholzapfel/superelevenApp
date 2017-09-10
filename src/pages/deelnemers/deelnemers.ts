import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {Deelnemer} from "../../models/deelnemers";
import {DeelnemerProvider} from "../../providers/deelnemersprovider";
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs/Subscription";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {PredictionPage} from "../prediction/prediction";
import {FormControl} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-deelnemers',
  templateUrl: 'deelnemers.html',
})
export class DeelnemersPage {
  searchTerm: string = '';
  searchControl: FormControl;

  unmutatedDeelnemers: Deelnemer[];
  deelnemers: Deelnemer[];
  deelnemersSub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private deelnemerProvider: DeelnemerProvider,
              public popoverCtrl: PopoverController) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    this.unmutatedDeelnemers = [];
    if (!this.unmutatedDeelnemers) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.deelnemersSub = this.deelnemerProvider.getDeelnemers().subscribe(
      response => {
        this.unmutatedDeelnemers = response;
        this.deelnemers = response;
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
          this.setFilteredItems();
        });

        SpinnerDialog.hide();
      });
  }

  goToDetails(deelnemer: Deelnemer) {
    this.navCtrl.push(PredictionPage, {participant: deelnemer})
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DeelnemersPage');
  }

  ionViewWillLeave() {
    this.deelnemersSub.unsubscribe();
  }

  setFilteredItems() {
    this.deelnemers = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.unmutatedDeelnemers.filter((item) => {
      return item.Participant.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() {
    SpinnerDialog.show();
  }
}
