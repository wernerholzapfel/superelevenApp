import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Deelnemer} from "../models/deelnemers";

/*
  Generated class for the DeelnemerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DeelnemerProvider {

  superElevenApi = 'http://www.supereleven.nl/api';
  constructor(public http: Http) {}

  getDeelnemers(): Observable<Deelnemer[]> {
    return this.http.get(`${this.superElevenApi}/participants`)
      .map(res => <Deelnemer[]> res.json())
    }


}
