import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Teamstand} from "../models/teamstand";
import {Speelronde} from "../models/speelronde";

@Injectable()
export class WedstrijdenstandProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  // 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

  // getLatestRound(): Observable<Speelronde[]> {
  //   return this.http.get(`${this.superElevenApi}/rounds`)
  //     .map(res => <Speelronde[]>res.json());
  // }

  getWedstrijdenstand(): Observable<any[]> {
    return this.http.get(`${this.superElevenApi}/wedstrijdenStand/`)
      .map(res => <any[]>res.json());
  }
}

