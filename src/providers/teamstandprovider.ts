import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Teamstand} from "../models/teamstand";

@Injectable()
export class TeamstandProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

//todo get latest roundId
  load(): Observable<Teamstand[]> {
    return this.http.get(`${this.superElevenApi}/newteamStand/10`)
      .map(res => <Teamstand[]>res.json());
  }
}

