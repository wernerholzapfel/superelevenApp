import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Teamstand} from "../models/teamstand";
import {Speelronde} from "../models/speelronde";

@Injectable()
export class VragenstandProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  // 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

  getVragenstand(): Observable<any[]> {
    return this.http.get(`${this.superElevenApi}/vragenStand/`)
      .map(res => <any[]>res.json());
  }
}

