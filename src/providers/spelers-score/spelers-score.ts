
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SpelersScoreProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

  getSpelerslijst(): Observable<any[]> {
    return this.http.get(`${this.superElevenApi}/spelerstotaalpunten`)
      .map(res => <any[]> res.json())
  }

  getSpelerslijstPerRound(roundId: number): Observable<any[]> {
    return this.http.get(`${this.superElevenApi}/spelerstotaalpunten/` + roundId)
      .map(res => <any[]> res.json())
  }
}
