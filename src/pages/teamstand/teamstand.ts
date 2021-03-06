import {Component} from "@angular/core";
import {NavController, ViewController, PopoverController} from "ionic-angular";
import {Teamstand} from "../../models/teamstand";
import {TeamstandProvider} from "../../providers/teamstandprovider";
import {TeamstandDetailsPage} from "../teamstand-details/teamstand-details";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";
import {Laatsteupdate} from "../../models/laatsteupdate";
import {Subscription} from "rxjs";
import {DropdownmenuPage} from "../dropdownmenu/dropdownmenu";
import { SpinnerDialog } from 'ionic-native';


@Component({
  selector: 'page-organizations',
  templateUrl: 'teamstand.html'
})
export class TeamstandPage {
  teamstand: Teamstand[];
  laatsteupdate: Laatsteupdate;
  teamstandSub: Subscription;
  teamstandSub2: Subscription;
  laatstestandSub: Subscription;


  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private teamstandProvider: TeamstandProvider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    if(!this.teamstand)SpinnerDialog.show(null,null,null,{
      overlayOpacity: 50,
      textColorRed: 151,
      textColorGreen: 191,
      textColorBlue: 18
    });

    this.viewCtrl.showBackButton(false);
    this.teamstandSub = this.teamstandProvider.getLatestRound().subscribe(speelRondes => {

      this.teamstandSub2 = this.teamstandProvider.getTeamstand(speelRondes[speelRondes.length - 1].RoundId).subscribe(response => {
        console.log("teamstand geladen");
        this.teamstand = response;
        SpinnerDialog.hide();
      });
    });

    this.laatstestandSub = this.laatsteupdateProvider.load().subscribe(response => {
      console.log("laatste stand geladen");
      this.laatsteupdate = response;
    });
  }

  ionViewWillLeave() {
    this.teamstandSub.unsubscribe();
    this.teamstandSub2.unsubscribe();
    this.laatstestandSub.unsubscribe();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.teamstandProvider.getLatestRound().subscribe(speelRondes => {

      this.teamstandProvider.getTeamstand(speelRondes[speelRondes.length - 1].RoundId).subscribe(response => {
        console.log("teamstand gerefreshed");
        this.teamstand = response;
      });
    });

    this.laatsteupdateProvider.load().subscribe(response => {
      console.log("laatste update gerefreshed");
      this.laatsteupdate = response;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1500);

  }

  goToDetails(teamstandregel: any) {
    this.navCtrl.push(TeamstandDetailsPage, {teamstandregel})
  }

  ionViewDidLoad() {
    console.log('Hello teamstand Page');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    // popover._cssClass = 'menu';
    popover.present();
  }

}

