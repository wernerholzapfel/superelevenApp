import { Component } from '@angular/core';
import {TotaalstandPage} from "../totaalstand/totaalstand";
import {TeamstandPage} from "../teamstand/teamstand";
import {HomePage} from "../home/home";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage
  tab2Root: any = TotaalstandPage;
  tab3Root: any = TeamstandPage;

  constructor() {

  }
}
