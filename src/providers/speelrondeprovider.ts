import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Speelronde} from "../models/speelronde";

@Injectable()
export class LaatsteupdateProvider {
  superElevenApi = 'http://www.supereleven.nl/api';

  // 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

//todo get latest roundId
  load(): Observable<Speelronde> {
    return this.http.get(`${this.superElevenApi}/rounds`)
      .map(res => <Speelronde>res.json());
  }
}

