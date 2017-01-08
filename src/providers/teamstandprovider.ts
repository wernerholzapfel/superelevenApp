import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Teamstand} from "../models/teamstand";
import {Speelronde} from "../models/speelronde";

@Injectable()
export class TeamstandProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  // 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

  getLatestRound(): Observable<Speelronde[]> {
    return this.http.get(`${this.superElevenApi}/rounds`)
      .map(res => <Speelronde[]>res.json());
  }

  getTeamstand(speelronde: number): Observable<Teamstand[]> {
    return this.http.get(`${this.superElevenApi}/newteamStand/` + speelronde)
      .map(res => <Teamstand[]>res.json());
  }
}

