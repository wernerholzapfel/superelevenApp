import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Teamstand} from "../../models/teamstand";
import {TeamstandProvider} from "../../providers/teamstandprovider";

@Component({
  selector: 'page-organizations',
  templateUrl: 'teamstand.html'
})
export class TeamstandPage {
  teamstand: Teamstand[];
  constructor(public navCtrl: NavController, private teamstandProvider: TeamstandProvider) {
    teamstandProvider.load().subscribe(response => {
      console.log(response);
      this.teamstand = response;
    })
  }
  ionViewDidLoad() {
    console.log('Hello teamstand Page');
  }
}
