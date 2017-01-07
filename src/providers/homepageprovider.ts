import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Laatsteupdate} from "../models/laatsteupdate";
import {Nummereentotaalstand} from "../models/nummereentotaalstand";
import {Nummereenteamstandlaatsteronde} from "../models/Nummereenteamstandlaatsteronde";

@Injectable()
export class Homepageprovider {
  superElevenApi = "http://supereleventest.herokuapp.com/api";
    // 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

//todo get latest roundId
  getLaatsteupdate(): Observable<Laatsteupdate> {
    return this.http.get(`${this.superElevenApi}/laatsteupdate`)
      .map(res => <Laatsteupdate>res.json());
  }

  getnummereentotaalstand(): Observable<Nummereentotaalstand> {
    return this.http.get(`${this.superElevenApi}/nummereentotaalstand`)
      .map(res => <Nummereentotaalstand>res.json());
  }

  getnummereenweekstand(): Observable<Nummereenteamstandlaatsteronde> {
    return this.http.get(`${this.superElevenApi}/nummereenteamstandlaatsteronde`)
      .map(res => <Nummereenteamstandlaatsteronde>res.json());
  }
}

