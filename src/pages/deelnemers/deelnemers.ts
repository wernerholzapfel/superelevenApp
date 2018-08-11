import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {Deelnemer} from "../../models/deelnemers";
import {DeelnemerProvider} from "../../providers/deelnemersprovider";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {Subscription} from "rxjs/Subscription";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {PredictionPage} from "../prediction/prediction";
import {FormControl} from "@angular/forms";import 'rxjs/add/operator/debounceTime';
import {Homepageprovider} from '../../providers/homepageprovider';

// @IonicPage()
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
  isinschrijvingopenSub: Subscription;
  isinschrijvingopen: boolean;
  isLoading: boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private deelnemerProvider: DeelnemerProvider,
              private homepageProvider: Homepageprovider,
              private alertCtrl: AlertController,
              public popoverCtrl: PopoverController
  ) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {

    this.isinschrijvingopenSub = this.homepageProvider.isinschrijvingopen().subscribe(response =>
      this.isinschrijvingopen = response);
    this.unmutatedDeelnemers = [];
    if (!this.unmutatedDeelnemers) this.isLoading = true;

    this.viewCtrl.showBackButton(false);

    this.deelnemersSub = this.deelnemerProvider.getDeelnemers().subscribe(
      response => {
        this.unmutatedDeelnemers = response;
        this.deelnemers = response;
        this.setFilteredItems();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
          this.setFilteredItems();
        });

        this.isLoading = false;
      });
  }

  goToDetails(deelnemer: Deelnemer) {
    if (!this.isinschrijvingopen) {
      this.navCtrl.push(PredictionPage, {participant: deelnemer})
    } else {
      let alert = this.alertCtrl.create({
        title: 'Deelnemer',
        subTitle: 'Tijdens de inschrijfperiode kunnen de deelnemers niet bekeken worden',
        buttons: ['Ok']
      });
      alert.present();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DeelnemersPage');
  }

  ionViewWillLeave() {
    this.deelnemersSub.unsubscribe();
    this.isinschrijvingopenSub.unsubscribe();
  }

  setFilteredItems() {
    this.deelnemers = this.filterItems(this.searchTerm);
    this.isLoading = false;
  }

  filterItems(searchTerm) {
    return this.unmutatedDeelnemers.filter((item) => {
      return item.Participant.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() {
    this.isLoading = true;
  }
  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
