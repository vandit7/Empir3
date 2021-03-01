import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, Content, Platform, Slides, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { NewsDetailsPage } from '../news-details/news-details';
import { HomePage } from '../home/home';
import { ViewallPage } from '../viewall/viewall';
import { AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig, AdMobFree } from '@ionic-native/admob-free';

@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {
  result: any;
  newsBusiness: any;
  newsBusinessLenght: any;
  newsBanner1: any;
  newsBanner1Length: any;
  categoryName: any
  newsBanner2: any;
  newsBanner2Length: any;
  filterList: any;
  languageList: any;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0
  extraList: any;
  clickcnt: any = 0;
  clickLcl: any;
  adShow: any = 0;
  adsClick : any;
  dynCount : any;

  constructor(public navCtrl: NavController,
    private _Service: ServiceProvider,
    public platform: Platform,
    public admob: AdMobFree,
    public events: Events,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.filterList = JSON.parse(localStorage.getItem("filterList"));
    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(HomePage);
    });
    this.GetClick();
  }

  ionViewDidLoad() {
    //this.GetClick();
    this.news();
  }

  ionViewDidEnter(){
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  news() {
    this.clickLcl = localStorage.getItem("SubcategoryCnt");
    if (this.clickLcl == this.dynCount) {
      this.clickcnt = 1;
    } else {
      this.clickcnt += 1;
    }
    localStorage.setItem("SubcategoryCnt", this.clickcnt);
  //  this.CountFunction();
    this.categoryName = localStorage.getItem("categoryName");
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetNewsByCategory(this.categoryName, this.languageList, this.page).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        if (this.result.elist.lstNVbusiness != null && this.result.elist.lstNVbusiness != undefined) {
          this.newsBusiness = this.result.elist.lstNVbusiness;
          this.newsBusinessLenght = this.newsBusiness.length;
          JQuery(".cat_cls").css('display', 'block')
        } else {
          this.newsBusinessLenght = 0;
        }
        if (this.newsBusinessLenght > 0) {
          this.perPage = 15;
          this.totalData = this.result.elist.lstNVbusiness[0].Totalrecords;
          this.totalPage = this.result.elist.lstNVbusiness[0].totalpage;
        }
        if (this.result.elist.banner1 != null && this.result.elist.banner1 != undefined) {
          this.newsBanner1 = this.result.elist.banner1;
          this.newsBanner1Length = this.newsBanner1.length;
        } else {
          this.newsBanner1Length = 0;
        }
        if (this.result.elist.banner2 != null && this.result.elist.banner2 != undefined) {
          this.newsBanner2 = this.result.elist.banner2;
          this.newsBanner2Length = this.newsBanner2.length;
        }
        else {
          this.newsBanner2Length = 0;
        }
        loading.dismiss();
      }
    }, error => {
      loading.dismiss();
      //  console.log(error);
    });
  }
  viewAll(categoryName) {
    // localStorage.setItem("categoryName",categoryName);
    this.navCtrl.push(ViewallPage);
  }
  getnewDetails(Id) {
    this.clickLcl = localStorage.getItem("SubcategoryCnt");
    if (this.clickLcl == this.dynCount) {
      this.clickcnt = 1;
    } else {
      this.clickcnt += 1;
    }
    localStorage.setItem("SubcategoryCnt", this.clickcnt);
    this.CountFunction();
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
      catename: 'business'
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    this.categoryName = localStorage.getItem("categoryName");
    setTimeout(() => {
      this._Service.GetNewsByCategory(this.categoryName, this.languageList, this.page).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          if (this.result.elist.lstNVbusiness.length > 0) {
            if (this.result.elist.lstNVbusiness != null && this.result.elist.lstNVbusiness != undefined) {
              this.newsBusinessLenght = this.result.elist.lstNVbusiness.length;
              for (let i = 0; i < this.result.elist.lstNVbusiness.length; i++) {
                this.newsBusiness.push(this.result.elist.lstNVbusiness[i]);
              }
              if (this.newsBusinessLenght > 0) {
                this.perPage = 5;
                this.totalData = this.result.elist.lstNVbusiness[0].Totalrecords;
                this.totalPage = this.result.elist.lstNVbusiness[0].totalpage;
              }
              JQuery(".cat_cls").css('display', 'block')
            }
          }
        }
        infiniteScroll.complete();
      }, error => {
        //  console.log(error);
      });
    }, 1000);
  }

  GetClick() {
    this._Service.GetAdsClicks('SubcategoryPage').then(data => {
      this.result = data;
      if (this.result.status == 1) {
        if(this.result.info.length > 0){
          this.adsClick = this.result.info;
          this.dynCount = this.adsClick[0].Click;
          this.CountFunction();
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
      this.adShow = localStorage.getItem("Subcategoryshwads");
      if (this.adShow == 1) {
        this.adShow = 0;
        localStorage.setItem("Subcategoryshwads", this.adShow);
       // this.launchInterstitial();
      } else {
        this.adShow = 1;
        localStorage.setItem("Subcategoryshwads", this.adShow);
        //this.showRewardVideoAds();
      }
    }
  }

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
