import {Component} from '@angular/core';
import {NavController, Platform, PopoverController, ViewController} from 'ionic-angular';
import {Nummereentotaalstand} from '../../models/nummereentotaalstand';
import {Homepageprovider} from '../../providers/homepageprovider';
import {LaatsteupdateProvider} from '../../providers/laatsteupdateprovider';
import {Laatsteupdate} from '../../models/laatsteupdate';
import {Nummereenteamstandlaatsteronde} from '../../models/Nummereenteamstandlaatsteronde';
import {DropdownmenuPage} from '../dropdownmenu/dropdownmenu';
import {Headlines} from '../../models/headlines'
import {switchMap, take} from 'rxjs/operators'
import {Observable} from 'rxjs/Rx';
import {combineLatest} from 'rxjs/Rx/observable/combineLatest'
import {EmptyObservable} from 'rxjs/observable/EmptyObservable'
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nummereentotaalstand: Nummereentotaalstand;
  laatsteupdate: Laatsteupdate;
  nummereenteamstandlaatsteronde: Nummereenteamstandlaatsteronde;
  headline: Headlines;
  isinschrijvingopen: boolean;
  initSubscription: Subscription;
  isLoading: boolean;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              private homepageProvider: Homepageprovider,
              private laatsteupdateProvider: LaatsteupdateProvider,
              public popoverCtrl: PopoverController,
              private platform: Platform,
  ) {
  }

  ionViewWillEnter() {
    this.initSubscription = this.homepageProvider.isinschrijvingopen().pipe(
      switchMap(isInschrijvingOpen => {
        this.isinschrijvingopen = isInschrijvingOpen;
          if (!isInschrijvingOpen) {
            return Observable.combineLatest(
              this.homepageProvider.getnummereentotaalstand(),
              this.homepageProvider.getnummereenweekstand(),
              this.laatsteupdateProvider.load()
            )
          } else {
            return Observable.combineLatest(
              EmptyObservable,
              EmptyObservable,
              EmptyObservable
            )
          }
        }
      )).subscribe(
      ([nummereentotaalstand, nummereenweekstand, laatsteupdate]) => {
        this.nummereentotaalstand = nummereentotaalstand;
        this.nummereenteamstandlaatsteronde = nummereenweekstand;
        this.laatsteupdate = laatsteupdate;
      });

    this.viewCtrl.showBackButton(false);

    this.homepageProvider.getheadlines().pipe(take(1)).subscribe(response => {
      this.headline = response[0]
    });
  }

  ionViewWillLeave() {
    this.initSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(DropdownmenuPage);
    popover.present();
  }
}
