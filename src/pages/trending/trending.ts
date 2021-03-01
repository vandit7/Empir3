import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform,Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { NewsDetailsPage } from '../news-details/news-details';
import { HomePage } from '../home/home';

/**
 * Generated class for the TrendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trending',
  templateUrl: 'trending.html',
})
export class TrendingPage {

  filterList: any;
  languageList: any;
  languageList2 : any;
  result: any;
  newsTrending : any;
  trendingNotFound : any;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _Service: ServiceProvider,
    public platform: Platform,
    public events: Events,
    public loadingCtrl: LoadingController) {
      platform.registerBackButtonAction(() => {
        this.navCtrl.setRoot(HomePage);
      });
      this.filterList = JSON.parse(localStorage.getItem("filterList"));
      if (this.filterList != null && this.filterList != undefined) {
        this.languageList = this.filterList.languageList;
        this.languageList2 = this.filterList.languageList;
      } else {
        this.languageList = "en";
      }
      this.GetTrending();
  }

  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidLoad() {
  }

  GetTrending() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.getTrending(this.languageList,this.page).then(data => {
      this.result = data;
      if (this.result.info.length > 0) {
        this.newsTrending = this.result.info;
        this.trendingNotFound = false;
        this.perPage = 15;
        this.totalData = this.newsTrending[0].Totalrecords;
        this.totalPage = this.newsTrending[0].totalpage;
      }
      else {
        this.trendingNotFound = true;
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    this._Service.getTrending(this.languageList,this.page).then(data => {
      this.result = data;
      if (this.result.info.length > 0) {
        for (let i = 0; i < this.result.info.length; i++) {
          this.newsTrending.push(this.result.info[i]);
        }
        this.trendingNotFound = false;
        this.perPage = 16;
        this.totalData = this.newsTrending[0].Totalrecords;
        this.totalPage = this.newsTrending[0].totalpage;
      }
      infiniteScroll.complete();
    }, error => {
    });
  }

  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
    });
  }
}
