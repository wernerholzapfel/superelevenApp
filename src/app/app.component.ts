import {Component, ViewChild} from "@angular/core";
import {Platform, MenuController, Nav} from "ionic-angular";
import {StatusBar, Cordova, InAppBrowser} from "ionic-native";
import {HomePage} from "../pages/home/home";
import {Push, PushToken} from "@ionic/cloud-angular";
import {AuthService} from "../services/auth/auth";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make UsersPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public menu: MenuController,
              public push: Push,
              private auth: AuthService) {
    this.initializeApp();

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });

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


      // Schedule a token refresh on app start up
      this.auth.startupTokenRefresh();
    });
  }

  // openPage(page) {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   // navigate to the new page if it is not the current page
  //   this.nav.setRoot(page.component);
  // }
}
