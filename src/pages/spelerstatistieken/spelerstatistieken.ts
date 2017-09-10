import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {SpinnerDialog} from "ionic-native";
import {SpelerstatistiekenProvider} from "../../providers/spelerstatistieken/spelerstatistieken";
import {Subscription} from "rxjs/Subscription";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {DeelnemersPerSpelerPage} from "../deelnemers-per-speler/deelnemers-per-speler";
import {FormControl} from "@angular/forms";

/**
 * Generated class for the SpelerstatistiekenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-spelerstatistieken',
  templateUrl: 'spelerstatistieken.html',
})
export class SpelerstatistiekenPage {

  searchTerm: string = '';
  searchControl: FormControl;
  unmutatedSpelerlijst: any[];
  spelerlijst: any[];
  spelerlijstSub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private spelerstatistiekenProvider: SpelerstatistiekenProvider,
              public popoverCtrl: PopoverController,) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {

  }

  goToDetails(deelnemersPerSpeler: any) {

    this.navCtrl.push(DeelnemersPerSpelerPage, deelnemersPerSpeler)
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
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

    this.spelerlijstSub = this.spelerstatistiekenProvider.getSpelerslijst().subscribe(
      response => {
        this.spelerlijst = response;
        this.unmutatedSpelerlijst = response;
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
          this.setFilteredItems();

        });
        SpinnerDialog.hide();
      });

    console.log('ionViewDidLoad DeelnemersPage');
  }

  ionViewWillLeave() {
    this.spelerlijstSub.unsubscribe();
  }

  setFilteredItems() {
    this.spelerlijst = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.unmutatedSpelerlijst.filter((item) => {
      return (item.PlayerName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.Team.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });

  }

  onSearchInput() {
    SpinnerDialog.show();
  }
}
