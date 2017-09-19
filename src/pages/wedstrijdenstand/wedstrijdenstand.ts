import {Component} from "@angular/core";
import {NavController, ViewController, PopoverController} from "ionic-angular";
import {WedstrijdenstandProvider} from "../../providers/wedstrijdenstandprovider";
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs";
import {WedstrijdenstandDetailsPage} from "../wedstrijdenstand-details/wedstrijdenstand-details";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {FormControl} from "@angular/forms";

/*
 Generated class for the Wedstrijdenstand page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-wedstrijdenstand',
  templateUrl: 'wedstrijdenstand.html'
})
export class WedstrijdenstandPage {
  searchTerm: string = '';
  searchControl: FormControl;

  unmutatedwedstrijdenstand: any[];
  wedstrijdenstand: any[];
  wedstrijdenstandSub: Subscription;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private wedstrijdenstandProvider: WedstrijdenstandProvider) {
    this.searchControl = new FormControl();
  }


  ionViewWillEnter() {
    if (!this.wedstrijdenstand) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.wedstrijdenstandSub = this.wedstrijdenstandProvider.getWedstrijdenstand().subscribe(response => {
      this.wedstrijdenstand = response;
      this.unmutatedwedstrijdenstand = response;
      this.unmutatedwedstrijdenstand.forEach(function (element, index,array) {
          if (index === 0) {
            element.positie = index + 1;
          }
          else {
            if (array[index - 1].TotalMatchesScore != element.TotalMatchesScore) {
              element.positie = index + 1;
            }
            else {
              element.positie = array[index-1].positie
            }
          }
        }
      );
      this.setFilteredItems();
      this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
        this.setFilteredItems();
      });
      SpinnerDialog.hide();
    });

  }

  ionViewWillLeave() {
    this.wedstrijdenstandSub.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello WedstrijdenstandPage Page');
  }

  goToDetails(wedstrijdenregel: any) {
    this.navCtrl.push(WedstrijdenstandDetailsPage, {wedstrijdenregel})
  }

  setFilteredItems() {
    this.wedstrijdenstand = this.filterItems(this.searchTerm);
    SpinnerDialog.hide();
  }

  filterItems(searchTerm) {
    return this.unmutatedwedstrijdenstand.filter((item) => {
      return item.Participant.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() {
    SpinnerDialog.show();
  }
}
