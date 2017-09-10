import {Component} from "@angular/core";
import {NavController, ViewController, PopoverController} from "ionic-angular";
import {WedstrijdenstandProvider} from "../../providers/wedstrijdenstandprovider";
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs";
import {WedstrijdenstandDetailsPage} from "../wedstrijdenstand-details/wedstrijdenstand-details";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";

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
  wedstrijdenstand: any[];
  wedstrijdenstandSub: Subscription;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private wedstrijdenstandProvider: WedstrijdenstandProvider,
              public popoverCtrl: PopoverController) {
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
  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
