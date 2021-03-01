import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SplashPage } from '../pages/splash/splash';
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { ServiceProvider } from '../providers/services/services';
import * as JQuery from 'jquery';
import { TrendingPage } from '../pages/trending/trending';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MainmagazinePage } from '../pages/mainmagazine/mainmagazine';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { CovidPage } from '../pages/covid/covid';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  activePage: any;
  pages: Array<{ title: string, component: any }>;
  result: any;
  categoryLength: any;
  category: any;
  filterList: any;
  languageList: any;
  clickcnt: any = 0;
  clickLcl: any;
  adShow: any = 0;
  adsClick : any;
  dynCount : any;

  constructor(public platform: Platform,
    private _Service: ServiceProvider,
    public statusBar: StatusBar,
    private socialSharing: SocialSharing,
    public admob: AdMobFree,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    this.filterList = JSON.parse(localStorage.getItem("filterList"));
    //this.languageList = this.filterList.languageList;
    this.GetClick();
    this.GetMainCategory();

  }

  initializeApp() {
    //this.showBanner();
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#2375da');
      this.splashScreen.hide();
     // this.showBanner();
    });
  }

  openPage(page) {
    this.clickLcl = localStorage.getItem("click");
    if (this.clickLcl == this.dynCount) {
      this.clickcnt = 1;
    } else {
      this.clickcnt += 1;
    }
    localStorage.setItem("click", this.clickcnt);
    this.activePage = page;
    if (this.activePage == 'Home') {
      JQuery('.homecss').addClass('activeItem');
      JQuery('#trending').removeClass('activeItem');
      localStorage.setItem("categoryName", this.activePage);
      this.CountFunction();
      this.nav.setRoot(HomePage);
    } else if (page == 'Trending') {
      JQuery('.homecss').removeClass('activeItem');
      JQuery('#trending').addClass('activeItem');
      this.nav.setRoot(TrendingPage);
    }
    else if (page == 'Covid 19 World') {
      JQuery('.homecss').removeClass('activeItem');
      JQuery('#trending').removeClass('activeItem');
      this.nav.setRoot(CovidPage);
    }
    else if (this.activePage == 'Magazine') {
      this.CountFunction();
      JQuery('.homecss').removeClass('activeItem');
      JQuery('#trending').removeClass('activeItem');
      this.nav.setRoot(MainmagazinePage);
    }
    else if (this.activePage == 'Share App') {
      this.socialSharing.share("https://play.google.com/apps/testing/com.empire.news.opula1", "", null, null)
    }
    else if (this.activePage == 'Rate The App') {
      window.open("https://play.google.com/apps/testing/com.empire.news.opula1", "_system");
    }
    else {
      this.CountFunction();
      localStorage.setItem("categoryName", this.activePage);
      JQuery('.homecss').removeClass('activeItem');
      JQuery('#trending').removeClass('activeItem');
      this.nav.setRoot(SubcategoryPage);
    }
  }


  isActive(page) {
    return page == this.activePage;
  }

  GetMainCategory() {
    this._Service.GetMainCategory().then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.categoryLength = this.result.info.length
        this.category = this.result.info;
      }
      else {
        this.categoryLength = 0;
      }
    }, error => {
      //  console.log(error);
    });
  }

  GetClick() {
    this._Service.GetAdsClicks('MyApp').then(data => {
      this.result = data;
      if (this.result.status == 1) { 
        if(this.result.info.length > 0){
          this.adsClick = this.result.info;
          this.dynCount = this.adsClick[0].Click;
        }
      }
      else {
        this.dynCount = 5;
      }
    }, error => {
      //  console.log(error);
    });
  }

  CountFunction(){
    if (this.clickLcl == this.dynCount) {
      if (this.adShow == 1) {
        this.adShow = 0;
      //  this.launchInterstitial();
      } else {
        this.adShow = 1;
        //this.showRewardVideoAds();
      }
    }
  }

  // showBanner() {
  //   let bannerConfig: AdMobFreeBannerConfig = {
  //    // isTesting: true,
  //     autoShow: true,
  //     id: "ca-app-pub-7411514458694945/6378398179"
  //   };
  //   this.admob.banner.config(bannerConfig);
  //   this.admob.banner.prepare().then((result) => {
  //   }).catch(e => console.log(e));

  // }

  // launchInterstitial() {
  //   let interstitialConfig: AdMobFreeInterstitialConfig = {
  //     //isTesting: true,
  //     autoShow: true,
  //     id: "ca-app-pub-7411514458694945/6378753390"
  //   };

  //   this.admob.interstitial.config(interstitialConfig);
  //   this.admob.interstitial.prepare().then((result) => {
  //   });

  // }
  // showRewardVideoAds() {
  //   let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
  //     //isTesting: true, // Remove in production
  //     autoShow: true,
  //     id: "ca-app-pub-7411514458694945/3752590056"
  //   };
  //   this.admob.rewardVideo.config(RewardVideoConfig);
  //   this.admob.rewardVideo.prepare().then(() => {
  //   }).catch(e => alert(e));
  // }
}
