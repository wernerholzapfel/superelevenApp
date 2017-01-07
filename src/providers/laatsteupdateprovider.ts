import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import {Laatsteupdate} from "../models/laatsteupdate";

@Injectable()
export class LaatsteupdateProvider {
  superElevenApi = "http://supereleventest.herokuapp.com/api";
  // 'http://www.supereleven.nl/api';

  constructor(public http: Http) {
  }

  load(): Observable<Laatsteupdate> {
    return this.http.get(`${this.superElevenApi}/laatsteupdate`)
      .map(res => <Laatsteupdate>res.json());
  }
}

