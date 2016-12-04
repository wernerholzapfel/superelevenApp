import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Teamstand} from "../../models/teamstand";
import {TeamstandProvider} from "../../providers/teamstandprovider";
import {TeamstandDetailsPage} from "../teamstand-details/teamstand-details";
import {LaatsteupdateProvider} from "../../providers/laatsteupdateprovider";
import {Laatsteupdate} from "../../models/laatsteupdate";

@Component({
  selector: 'page-organizations',
  templateUrl: 'teamstand.html'
})
export class TeamstandPage {
  teamstand: Teamstand[];
  laatsteupdate: Laatsteupdate;
  constructor(public navCtrl: NavController,
              private teamstandProvider: TeamstandProvider,
              private laatsteupdateProvider : LaatsteupdateProvider) {
    teamstandProvider.getLatestRound().subscribe(speelRondes => {

      teamstandProvider.getTeamstand(speelRondes[speelRondes.length-1].RoundId).subscribe(response => {
        console.log(response);
        this.teamstand = response;
      });
    });

    laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.teamstandProvider.getLatestRound().subscribe(speelRondes => {

      this.teamstandProvider.getTeamstand(speelRondes[speelRondes.length-1].RoundId).subscribe(response => {
        console.log(response);
        this.teamstand = response;
      });
    });

    this.laatsteupdateProvider.load().subscribe(response => {
      console.log(response);
      this.laatsteupdate = response;
    });
    refresher.complete();
  }

  goToDetails(teamstandregel: any){
    this.navCtrl.push(TeamstandDetailsPage, {teamstandregel})
  }

  ionViewDidLoad() {
    console.log('Hello teamstand Page');
  }
}
