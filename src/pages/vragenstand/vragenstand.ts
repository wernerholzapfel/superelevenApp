import {Component} from "@angular/core";
import {NavController, PopoverController, ViewController} from "ionic-angular";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
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
  isLoading: boolean;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private vragenstandProvider: VragenstandProvider,
              public popoverCtrl: PopoverController,
              ) {
  }

  ionViewWillEnter() {
    if (!this.vragenstand) this.isLoading = true;

    this.viewCtrl.showBackButton(false);

    this.vragenstandSub = this.vragenstandProvider.getVragenstand().subscribe(response => {
      this.vragenstand = response;
      this.isLoading = false;
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
