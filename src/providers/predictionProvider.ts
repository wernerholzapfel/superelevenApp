import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the PredictionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PredictionProvider {

  superElevenApi = 'http://www.supereleven/api';
  constructor(public http: Http) {}

  getVoorspelling(participant): Observable<any> {
    return this.http.get(`${this.superElevenApi}/predictions/${participant}`)
      .map(res => <any> res.json())
  }


}
