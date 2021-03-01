import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFreeInterstitialConfig, AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { Urls } from '../../../ServerInfo/ApiInfoandData';

@IonicPage()
@Component({
  selector: 'page-video-news',
  templateUrl: 'video-news.html',
})
export class VideoNewsPage {
  categoryList: any = [];
  result: any;
  categoryName: any;
  heightCss: any;
  livefullurl: any;
  video_link: any;
  NewsTitle: any;
  AllVideo: any;
  iframeVar: any;
  videoImg: any;
  test: any;
  clickcnt: any = 0;
  clickLcl: any;
  adShow: any = 0;
  adsClick: any;
  dynCount: any;
  urls = new Urls();
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    public platform: Platform,
    public events: Events,
    public sanitizer: DomSanitizer,
    public admob: AdMobFree,
    public loadingCtrl: LoadingController,
    private _Service: ServiceProvider) {
    this.videoImg = true;
    this.heightCss = this.platform.height() - 337;

    platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });

  }

  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }
  // this.video_link="https://www.youtube.com/embed/"+filename;
  // filename is yO7kQQ3YWzY
  ionViewDidLoad() {
    this.heightCss = this.platform.height() - 337;
    this.GetAllVideo();
    JQuery('.dyn').removeClass('active-cateNew');
    JQuery('#test_' + this.categoryName).addClass('active-cateNew');
  }

  goHome() {
    this.navCtrl.pop();
  }


  GetAllVideo() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetAllVideo('VideoNewsPage').then(data => {
      this.result = data;
      if (this.result.status == '1') {
        this.AllVideo = this.result.info;
        if (localStorage.getItem("NewsPlay") == 'All') {
          this.video_link = this.result.info[0].link;
          this.NewsTitle = this.result.info[0].Title;
        }
        else {
          this.video_link = localStorage.getItem("NewsLink");
          this.NewsTitle = localStorage.getItem("NewsTitle");
        }
        if (this.result.extra != undefined) {
          this.dynCount = this.result.extra[0].Click;
        }
        else {
          this.dynCount = 5;
        }
        this.livefullurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_link);
        this.videoImg = false;
      }
      else {
        this.videoImg = true;
        this.dynCount = 5;
      }
      loading.dismiss();

    }, error => {
      // console.log(error.json());
    });
  }
  
  setVideo(link, Title) {
    this.clickLcl = localStorage.getItem("videoclick");
    if (this.clickLcl == this.dynCount) {
      this.clickcnt = 1;
    } else {
      this.clickcnt += 1;
    }
    localStorage.setItem("videoclick", this.clickcnt);
    this.CountFunction();
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.video_link = link;
    this.livefullurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_link);
    this.NewsTitle = Title;
    loading.dismiss();
  }

  share(NewsTitle, livefullurl) {
    this.socialSharing.share(livefullurl, NewsTitle, null, null)
  }

  CountFunction() {
    if (this.clickLcl == this.dynCount) {
      if (this.adShow == 1) {
        this.adShow = 0;
        //this.launchInterstitial();
      } else {
        this.adShow = 1;
       // this.showRewardVideoAds();
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
