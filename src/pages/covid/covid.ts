import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Urls } from '../../../ServerInfo/ApiInfoandData';
import { HomePage } from '../home/home';

/**
 * Generated class for the CovidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-covid',
  templateUrl: 'covid.html',
})
export class CovidPage {
  result: any;
  clickcnt: any = 0;
  clickLcl: any;
  adShow: any = 0;
  adsClick: any;
  dynCount: any;
  urls = new Urls();
  table : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public admob: AdMobFree,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private _Service: ServiceProvider,
    public events: Events) {

      platform.registerBackButtonAction(() => {
        //this.launchInterstitial();
        this.navCtrl.setRoot(HomePage);
      });
      this.GetClick();
  }
  
  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      //this.launchInterstitial();
      this.navCtrl.setRoot(HomePage);
    });
  }

  ionViewDidLoad() {
    this.GetAllDetailscorona();
  }

  GetAllDetailscorona() {
    this.clickLcl = localStorage.getItem("covidct");
    if (this.clickLcl == this.dynCount) {
      this.clickcnt = 1;
    } else {
      this.clickcnt += 1;
    }
    localStorage.setItem("covidct", this.clickcnt);
    this.CountFunction();
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetAllDetailscorona().then(data => {
      this.result = data;
      if (this.result.status == '1') {
        this.table = this.result.info;
      }
      
      loading.dismiss();

    }, error => {
      // console.log(error.json());
    });
  }

  GetClick() {
    this._Service.GetAdsClicks('covid').then(data => {
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
        //this.launchInterstitial();
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
  
  
}
