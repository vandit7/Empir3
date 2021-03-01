import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { timer } from 'rxjs/observable/timer';
import { HomePage } from '../home/home';
/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  showSplash = true;
  constructor(
    public navCtrl: NavController,
    public platform: Platform, 
    public statusBar: StatusBar,
     public splashScreen: SplashScreen,
     public menuCtrl: MenuController,
     ) {
      this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
      } else {
      }
      timer(3000).subscribe(() => this.showSplash = false)
    });
  }

  goHomepage(){
    this.navCtrl.push(HomePage);
  }



}
