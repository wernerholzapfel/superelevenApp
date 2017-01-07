import {Component} from "@angular/core";
import {NavController, ViewController, PopoverController} from "ionic-angular";
import {Totaalstand} from "../../models/totaalstand";
import {TotaalstandProvider} from "../../providers/totaalstandProvider";
import {TotaalstandDetailsPage} from "../totaalstand-details/totaalstand-details";
import {Laatsteupdate} from "../../models/laatsteupdate";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";
import {Subscription} from "rxjs";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";

@Component({
  selector: 'page-totaalstand',
  templateUrl: 'totaalstand.html'
})

export class TotaalstandPage {
  totaalstand: Totaalstand;
  laatsteupdate: Laatsteupdate;
  totaalstandSub: Subscription;
  laatsteupdateSub: Subscription;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private totaalstandProvider: TotaalstandProvider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);

    this.totaalstandSub = this.totaalstandProvider.load().subscribe(response => {
      console.log(response);
      this.totaalstand = response;
    });

    this.laatsteupdateSub = this.laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.totaalstandProvider.load().subscribe(response => {
      this.totaalstand = response;
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
    this.navCtrl.push(TotaalstandDetailsPage, {totaalstandregel})
  }

  ionViewDidLoad() {
    console.log('Hello totaalstandPage Page');
  }

  ionViewWillLeave() {
    this.totaalstandSub.unsubscribe();
    this.laatsteupdateSub.unsubscribe();
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    // popover._cssClass = 'menu';
    popover.present();
  }
}
