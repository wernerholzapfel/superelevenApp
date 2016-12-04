import { Component } from '@angular/core';
import {TotaalstandPage} from "../totaalstand/totaalstand";
import {TeamstandPage} from "../teamstand/teamstand";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = TotaalstandPage;
  tab2Root: any = TeamstandPage;

  constructor() {

  }
}
