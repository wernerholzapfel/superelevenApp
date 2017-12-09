import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {SpelerstatistiekenProvider} from "../../providers/spelerstatistieken/spelerstatistieken";
import {Subscription} from "rxjs/Subscription";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {DeelnemersPerSpelerPage} from "../deelnemers-per-speler/deelnemers-per-speler";
import {FormControl} from "@angular/forms";import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the SpelerstatistiekenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
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
  isLoading: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private spelerstatistiekenProvider: SpelerstatistiekenProvider,
              public popoverCtrl: PopoverController,
              ) {
    this.searchControl = new FormControl();
  }


  goToDetails(deelnemersPerSpeler: any) {

    this.navCtrl.push(DeelnemersPerSpelerPage, deelnemersPerSpeler)
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.spelerlijst = [];
    if (!this.spelerlijst) this.isLoading = true;

    this.viewCtrl.showBackButton(false);

    this.spelerlijstSub = this.spelerstatistiekenProvider.getSpelerslijst().subscribe(
      response => {
        this.spelerlijst = response;
        this.unmutatedSpelerlijst = response;
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
          this.setFilteredItems();

        });
        this.isLoading = false;
      });

    console.log('ionViewDidLoad DeelnemersPage');
  }

  ionViewWillLeave() {
    this.spelerlijstSub.unsubscribe();
  }

  setFilteredItems() {
    this.spelerlijst = this.filterItems(this.searchTerm);
    this.isLoading = false;
  }

  filterItems(searchTerm) {
    return this.unmutatedSpelerlijst.filter((item) => {
      return (item.PlayerName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.Team.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    });

  }

  onSearchInput() {
    this.isLoading = true;
  }

}
