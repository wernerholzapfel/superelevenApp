import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Totaalstand } from '../models/totaalstand';

@Injectable()
export class TotaalstandProvider {
  superElevenApi = 'http://www.supereleven.nl/api';
  // 'http://supereleventest.herokuapp.com/api';


  constructor(public http: Http) { }


  // Load all github totaalstand
  load(): Observable<Totaalstand> {
    return this.http.get(`${this.superElevenApi}/totaalstand`)
      .map(res => <Totaalstand>res.json());
  }
}
