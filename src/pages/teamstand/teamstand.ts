import {Component} from '@angular/core';
import {NavController, PopoverController, ViewController} from 'ionic-angular';
import {Teamstand} from '../../models/teamstand';
import {TeamstandProvider} from '../../providers/teamstandprovider';
import {TeamstandDetailsPage} from '../teamstand-details/teamstand-details';
import {LaatsteupdateProvider} from '../../providers/laatsteupdateprovider';
import {Laatsteupdate} from '../../models/laatsteupdate';
import {Subscription} from 'rxjs';
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';
import {FormControl} from '@angular/forms';
import {switchMap, debounceTime} from 'rxjs/operators';

//search implementation https://www.joshmorony.com/high-performance-list-filtering-in-ionic-2/
@Component({
  selector: 'page-teamstand',
  templateUrl: 'teamstand.html'
})
export class TeamstandPage {
  searchTerm: string = '';
  searchControl: FormControl;

  unmutatedTeamstand: Teamstand[];
  teamstand: Teamstand[];

  laatsteupdate: Laatsteupdate;
  filterTeamstandSub: Subscription;
  laatstestandSub: Subscription;
  speelrondeList: any[];
  activeSpeelronde: number;
  isLoading: boolean;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private teamstandProvider: TeamstandProvider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.unmutatedTeamstand = [];
    if (!this.unmutatedTeamstand) this.isLoading = true;

    this.viewCtrl.showBackButton(false);
    this.filterTeamstandSub = this.teamstandProvider.getLatestRound()
      .pipe(switchMap(speelRondes => {
        this.speelrondeList = speelRondes;
        if (!this.activeSpeelronde) {
          this.activeSpeelronde = this.speelrondeList.length;
        }
        return this.teamstandProvider.getTeamstand(this.activeSpeelronde)
      }))
      .pipe(switchMap(teamStandResponse => {
        console.log('teamstand geladen');
        this.unmutatedTeamstand = teamStandResponse;
        this.unmutatedTeamstand.forEach(function (element, index, array) {
          if (index === 0) {
            element.positie = index + 1;
          }
          else {
            if (array[index - 1].TotalTeamScore != element.TotalTeamScore) {
              element.positie = index + 1;
            }
            else {
              element.positie = array[index - 1].positie
            }
          }
        });

        this.teamstand = teamStandResponse;

        this.setFilteredItems();
        return this.searchControl.valueChanges.pipe(debounceTime(500))
      }))
      .subscribe(search => {
        this.setFilteredItems();
      });

    this.isLoading = false;

    this.laatstestandSub = this.laatsteupdateProvider.load().subscribe(response => {
      console.log('laatste stand geladen');
      this.laatsteupdate = response;
    });
  }

  ionViewWillLeave() {
    this.filterTeamstandSub.unsubscribe();
    this.laatstestandSub.unsubscribe();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.filterTeamstandSub = this.teamstandProvider.getLatestRound()
      .pipe(switchMap(speelRondes => {
        this.speelrondeList = speelRondes;
        this.activeSpeelronde = this.speelrondeList.length;
        console.log('dit is de activespeelronde ' + this.activeSpeelronde);
        return this.teamstandProvider.getTeamstand(this.activeSpeelronde)
      }))
      .subscribe(response => {
        console.log('teamstand gerefreshed');
        this.teamstand = response;
      });

    this.laatsteupdateProvider.load().subscribe(response => {
      console.log('laatste update gerefreshed');
      this.laatsteupdate = response;
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1500);

  }

  getStand(event) {
    this.isLoading = true;
    this.teamstandProvider.getTeamstand(this.activeSpeelronde).subscribe(response => {
      console.log('get teamstand call');
      this.teamstand = response;
      this.teamstand.forEach(function (element, index, array) {
        if (index === 0) {
          element.positie = index + 1;
        }
        else {
          if (array[index - 1].TotalTeamScore != element.TotalTeamScore) {
            element.positie = index + 1;
          }
          else {
            element.positie = array[index - 1].positie
          }
        }
      });

      this.isLoading = false;
    });
  }

  goToDetails(teamstandregel: any) {
    this.navCtrl.push(TeamstandDetailsPage, {teamstandregel})
  }

  ionViewDidLoad() {
    console.log('Hello teamstand Page');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }

  setFilteredItems() {
    this.teamstand = this.filterItems(this.searchTerm);
    this.isLoading = false;
  }

  filterItems(searchTerm) {
    return this.unmutatedTeamstand.filter((item) => {
      return item.Participant.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() {
    this.isLoading = true;
  }

}

