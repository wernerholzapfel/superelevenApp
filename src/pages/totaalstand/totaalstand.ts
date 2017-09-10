import {Component} from "@angular/core";
import {NavController, ViewController, PopoverController} from "ionic-angular";
import {deelnemers, Totaalstand} from "../../models/totaalstand";
import {TotaalstandProvider} from "../../providers/totaalstandProvider";
import {TotaalstandDetailsPage} from "../totaalstand-details/totaalstand-details";
import {Laatsteupdate} from "../../models/laatsteupdate";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";
import {Subscription} from "rxjs";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import { SpinnerDialog } from 'ionic-native';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'page-totaalstand',
  templateUrl: 'totaalstand.html'
})

export class TotaalstandPage {
  searchTerm: string = '';
  searchControl: FormControl;

  unmutatedTotaalstand: deelnemers[];
  totaalstand: deelnemers[];
  laatsteupdate: Laatsteupdate;
  totaalstandSub: Subscription;
  laatsteupdateSub: Subscription;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private totaalstandProvider: TotaalstandProvider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    if(!this.unmutatedTotaalstand)SpinnerDialog.show(null,null,null,{
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.totaalstandSub = this.totaalstandProvider.load().subscribe(response => {
      console.log("totaalstand geladen");
      this.unmutatedTotaalstand = response.deelnemers;
      this.totaalstand = response.deelnemers;

      this.setFilteredItems();
      this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
        this.setFilteredItems();
      });
      SpinnerDialog.hide();

    });

    this.laatsteupdateSub = this.laatsteupdateProvider.load().subscribe(response => {
      console.log("laatste update geladen");
      this.laatsteupdate = response;
    });
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.totaalstandProvider.load().subscribe(response => {
      this.unmutatedTotaalstand = response.deelnemers;
    });
    this.laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1500);
  }

  goToDetails(totaalstandregel: any) {
    console.log("go to details fired");
    this.navCtrl.push(TotaalstandDetailsPage, {totaalstandregel})
  }

  ionViewDidLoad() {
    console.log('Hello totaalstandPage Page');
  }

  ionViewWillLeave() {
    this.totaalstandSub.unsubscribe();
    this.laatsteupdateSub.unsubscribe();
  }

  setFilteredItems() {
    this.totaalstand = this.filterItems(this.searchTerm);
    SpinnerDialog.hide();
  }

  filterItems(searchTerm) {
    return this.unmutatedTotaalstand.filter((item) => {
      return item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() {
    SpinnerDialog.show();
  }
}
