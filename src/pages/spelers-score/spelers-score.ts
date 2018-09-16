import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ViewController} from 'ionic-angular';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {SpelersScoreProvider} from '../../providers/spelers-score/spelers-score';
import {TeamstandProvider} from '../../providers/teamstandprovider';
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';
import {switchMap, debounceTime} from 'rxjs/operators';

// @IonicPage()
@Component({
  selector: 'page-spelers-score',
  templateUrl: 'spelers-score.html',
})
export class SpelersScorePage {

  searchTerm: string = '';
  searchControl: FormControl;

  unmutatedSpelerlijst: any[];
  spelerlijst: any[];
  spelerlijstSub: Subscription;

  speelrondeList: any[];
  activeSpeelronde: number;
  isLoading: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private teamstandProvider: TeamstandProvider,
              public popoverCtrl: PopoverController,
              private spelersScoreProvider: SpelersScoreProvider,) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    this.isLoading = true;

    this.spelerlijst = [];
    if (!this.spelerlijst) this.isLoading = true;

    this.viewCtrl.showBackButton(false);

    this.spelerlijstSub = this.teamstandProvider.getLatestRound()
      .pipe(switchMap(speelRondes => {
        this.speelrondeList = speelRondes;
        if (!this.activeSpeelronde) {
          this.activeSpeelronde = this.speelrondeList.length;
        }
        return this.spelersScoreProvider.getSpelerslijstPerRound(this.activeSpeelronde)
      })
    ).pipe(switchMap(response => {
        this.spelerlijst = response;
        this.unmutatedSpelerlijst = response;
        this.setFilteredItems();
        return this.searchControl.valueChanges.pipe(debounceTime(500))}))
      .subscribe(search => {
          this.setFilteredItems();
        });
        this.isLoading = false;
  }

ionViewWillLeave()
{
  this.spelerlijstSub.unsubscribe();
}

setFilteredItems()
{
  this.spelerlijst = this.filterItems(this.searchTerm);
  this.isLoading = false;
}

filterItems(searchTerm)
{
  return this.unmutatedSpelerlijst.filter((item) => {
    return (item.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      item.Team.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  });
}

onSearchInput()
{
  this.isLoading = true;
}

getSpelerslijst(event)
{
  this.isLoading = true;

  if (event === 'Alle') {
    this.spelersScoreProvider.getSpelerslijst().subscribe(response => {
      console.log('get gesommeerde spelerslijst');
      this.unmutatedSpelerlijst = response;
      this.spelerlijst = response;
      this.isLoading = false;
    });
  }
  else {
    this.spelersScoreProvider.getSpelerslijstPerRound(this.activeSpeelronde).subscribe(response => {
      console.log('get spelerslijst call');
      this.unmutatedSpelerlijst = response;
      this.spelerlijst = response;
      this.isLoading = false;
    });
  }
}

presentPopover(event)
{
  let popover = this.popoverCtrl.create(DropdownmenuPage);
  popover.present();
}
}



