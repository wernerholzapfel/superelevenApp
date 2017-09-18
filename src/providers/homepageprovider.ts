import {Injectable} from "@angular/core";
import {Http,RequestOptions, Headers} from "@angular/http";
import {AuthHttp} from 'angular2-jwt';
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Laatsteupdate} from "../models/laatsteupdate";
import {Nummereentotaalstand} from "../models/nummereentotaalstand";
import {Nummereenteamstandlaatsteronde} from "../models/Nummereenteamstandlaatsteronde";
import {Headlines} from "../models/headlines";
import {AuthService} from "../services/auth.services";

@Injectable()
export class Homepageprovider {
  superElevenApi = 'http://www.supereleven.nl/api';
  // superElevenApi = 'localhost:8200/api';

  constructor(public http: Http, public auth: AuthService) {
  }

//todo get latest roundId
  getLaatsteupdate(): Observable<Laatsteupdate> {
    return this.http.get(`${this.superElevenApi}/laatsteupdate`)
      .map(res => <Laatsteupdate>res.json());
  }

  getuserscore(): Observable<string> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.auth.idToken });
    let options = new RequestOptions({ headers: headers });


    return this.http.get(`${this.superElevenApi}/totaalscoreuser`, options)
      .map(res => <string>res.json());
  }

  getnummereentotaalstand(): Observable<Nummereentotaalstand> {
    return this.http.get(`${this.superElevenApi}/nummereentotaalstand`)
      .map(res => <Nummereentotaalstand>res.json());
  }

  getnummereenweekstand(): Observable<Nummereenteamstandlaatsteronde> {
    return this.http.get(`${this.superElevenApi}/nummereenteamstandlaatsteronde`)
      .map(res => <Nummereenteamstandlaatsteronde>res.json());
  }

  getheadlines(): Observable<Headlines[]> {
    return this.http.get(`${this.superElevenApi}/headlines`)
      .map(res => <Headlines[]>res.json());
  }
}

