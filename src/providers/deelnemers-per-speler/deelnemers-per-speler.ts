import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DeelnemersPerSpelerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DeelnemersPerSpelerProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
    console.log('Hello DeelnemersPerSpelerProvider Provider');
  }

  getDeelnemerPerSpeler(playerId): Observable<any> {
    return this.http.get(`${this.superElevenApi}/welkedeelnemershebbendezespeler/${playerId}`)
      .map(res => <any> res.json())
  }
}
