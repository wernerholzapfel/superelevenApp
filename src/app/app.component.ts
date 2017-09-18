import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {HomePage} from "../pages/home/home";
import Auth0Cordova from '@auth0/cordova';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,  public menu: MenuController) {
    this.initializeApp();

  //   // set our app's pages
  //   this.pages = [
  //     { title: 'Team stand', component: TeamstandPage },
  //     { title: 'Totaal stand', component: TotaalstandPage}
  //   ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();


      //auth0
      (<any>window).handleOpenURL = (url) => {
        Auth0Cordova.onRedirectUri(url);
      };

      // onesignal
      let notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("eb25a650-dde9-4137-9b48-e4e1323c93a7", "AAAAPHn_vFg:APA91bErCBmvhhJvkOeUstTD1DsqtGpfm6vQ7rk7m-Tib1njLfa7fEVJj60LlN5PZL28c6ySe6xsJXLlpFMzihwmJFFVM1mw8QzmZSi0tQJnGlaucTdqC2v-2XUropTC0JAx3CWaD_uW")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });
  }

  // openPage(page) {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   // navigate to the new page if it is not the current page
  //   this.nav.setRoot(page.component);
  // }
}
