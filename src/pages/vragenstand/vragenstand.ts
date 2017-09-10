import {Component} from "@angular/core";
import {NavController, PopoverController, ViewController} from "ionic-angular";
import {SpinnerDialog} from "ionic-native";
import {Subscription} from "rxjs";
import {VragenstandProvider} from "../../providers/vragenstandprovider";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import {VragenstandDetailsPage} from "../vragenstand-details/vragenstand-details";

@Component({
  selector: 'page-vragenstand',
  templateUrl: 'vragenstand.html'
})
export class VragenstandPage {
  vragenstand: any[];
  vragenstandSub: Subscription;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private vragenstandProvider: VragenstandProvider,
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    if (!this.vragenstand) SpinnerDialog.show(null, null, null, {
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);

    this.vragenstandSub = this.vragenstandProvider.getVragenstand().subscribe(response => {
      this.vragenstand = response;
      SpinnerDialog.hide();
    });

  }

  ionViewWillLeave() {
    this.vragenstandSub.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello VragenstandPage Page');
  }

  goToDetails(vragenregel: any) {
    this.navCtrl.push(VragenstandDetailsPage, {vragenregel})
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }


}
