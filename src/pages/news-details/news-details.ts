import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Events, Content } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { detailsModel } from './detailsModel';
import { AuthorpagePage } from '../authorpage/authorpage';
import { AdMobFreeInterstitialConfig, AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  title: any;
  result: any;
  content1: any;
  info: any = [];
  image: any;
  description: any;
  publishedAt: any;
  newsList: any = [];
  author: any;
  categoryList: any = [];
  categoryName: any;
  catename: any;
  newsTitle: any;
  newsRelated: any;
  newsRelatedLenght: any;
  newsBanner2: any;
  newsBanner2Length: any;
  dtmodel = new detailsModel();
  filterList: any;
  languageList: any;
  newsId: any;
  newsUrl: any;
  logo: any;
  IsTitle: any;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0
  clickcnt: any = 0;
  clickLcl: number;
  adShow: any = 0;
  adsClick: any;
  dynCount: any;

  @ViewChild('pageTop') pageTop: Content;
  constructor(public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    public events: Events,
    public admob: AdMobFree,
    private _Service: ServiceProvider) {
    this.newsId = this.navParams.get('Id');
    this.catename = this.navParams.get('catename');

    this.filterList = JSON.parse(localStorage.getItem("filterList"));

    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
    // this.GetClick();
  }

  slides: any[];
  mySlideOptions = {
    pager: true
  };

  ionViewDidLoad() {
    this.GetClick();
    this.newsDetails();
  }
  ionViewWillLeave() {
    this.pageTop.scrollToTop();
  }

  goHome() {
    this.navCtrl.pop();
  }

  GetClick() {
    this._Service.GetAdsClicks('NewsDetailsPage').then(data => {
      this.result = data;
      if (this.result.status == 1) {
        if (this.result.info.length > 0) {
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

  CountFunction() {
    if (this.clickLcl == this.dynCount) {
      this.clickLcl = Number(localStorage.getItem("adShowDet"));
      if (this.clickLcl == 1) {
        this.adShow = 0;
        localStorage.setItem("adShowDet", (this.clickLcl).toString());
       // this.launchInterstitial();
      } else {
        this.adShow = 1;
        localStorage.setItem("adShowDet", (this.clickLcl).toString());
        //this.showRewardVideoAds();
      }
    }
  }

  newsDetails() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.dtmodel.Id = this.newsId;
    this.dtmodel.languageList = this.languageList;
    this.dtmodel.page = this.page;
    this._Service.getNewsDet(this.dtmodel).then(data => {
      this.clickLcl = Number(localStorage.getItem("adShowDet"));
      if (this.clickLcl == this.dynCount) {
        this.clickLcl = 1;
        localStorage.setItem("adShowDet", (this.clickLcl).toString());
      } else {
        this.clickLcl += 1;
        localStorage.setItem("adShowDet", (this.clickLcl).toString());
      }
      this.CountFunction();

      this.result = data;
      if (this.result.status == 1) {
        this.content1 = this.result.info[0].title;
        this.image = this.result.info[0].urlToImage;
        this.description = this.result.info[0].description;
        this.publishedAt = this.result.info[0].PublishDate;
        this.author = this.result.info[0].author;
        this.newsUrl = this.result.info[0].url;
        this.logo = this.result.info[0].Logo;
        this.IsTitle = this.result.info[0].IsTitle;
        if (this.result.extra.lstrelated.length > 0) {
          this.newsRelated = this.result.extra.lstrelated;
          this.newsRelatedLenght = this.newsRelated.length;
          this.perPage = 7;
          this.totalData = this.newsRelated[0].Totalrecords;
          this.totalPage = this.newsRelated[0].totalpage;
        }
        else {
          this.newsRelatedLenght = 0;
        }
        this.newsBanner2 = this.result.extra.banner2;
        this.newsBanner2Length = this.newsBanner2.length;
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
      // console.log(error.json());
    });
  }

  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id
    });
  }

  authorpage1(authorname) {
    if (this.IsTitle == 1) {
      this.navCtrl.push(AuthorpagePage, {
        authorname: authorname
      });
    }
  }

  getcategory() {
    this._Service.getCategoryList(this.languageList).then(data => {
      this.result = data;
      this.categoryList = this.result.info;
      setTimeout(() => {
        JQuery("#" + this.catename).addClass('active-cateNew');
      }, 500);
    }, error => {
    });
  }

  share() {
    this.socialSharing.share(this.newsUrl, this.image, null, null)
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    this.dtmodel.Id = this.newsId;
    this.dtmodel.languageList = this.languageList;
    this.dtmodel.page = this.page;
    this._Service.getNewsDet(this.dtmodel).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        if (this.result.extra.lstrelated.length > 0) {
          this.newsRelatedLenght = this.result.extra.lstrelated.length;
          for (let i = 0; i < this.result.extra.lstrelated.length; i++) {
            this.newsRelated.push(this.result.extra.lstrelated[i]);
          }
          this.perPage = 10;
          this.totalData = this.newsRelated[0].Totalrecords;
          this.totalPage = this.newsRelated[0].totalpage;
        }
        else {
          this.newsRelatedLenght = 0;
        }
        infiniteScroll.complete();
      }

    }, error => {
      // console.log(error.json());
    });
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
