import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { NewsDetailsPage } from '../news-details/news-details';

@IonicPage()
@Component({
  selector: 'page-viewall1',
  templateUrl: 'viewall1.html',
})
export class Viewall1Page {

  result: any;
  newsList: any = [];
  NewsType: any;
  filterList: any;
  languageList: any;
  displayItems: any = [];
  newsListLength: any;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0

  constructor(public navCtrl: NavController,
    private _Service: ServiceProvider,
    public platform: Platform,
    public events: Events,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
    this.filterList = JSON.parse(localStorage.getItem("filterList"));
    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    this.getAllDetailsType();

    platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });

  }

  ionViewDidLoad() {
  }
  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }


  getAllDetailsType() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.NewsType = localStorage.getItem("NewsType");
    this._Service.GetAllNewsByType(this.NewsType, this.languageList,this.page).then(data => {
      this.result = data;
      if (this.result != null && this.result != undefined) {
        this.newsList = this.result.info;
        this.newsListLength = this.newsList.length;
        this.perPage = 16;
        this.totalData = this.newsList[0].Totalrecords;
        this.totalPage = this.newsList[0].totalpage;
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
      // console.log(error.json());
    });
  }
  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
      catename: this.NewsType
    });
  }

  doInfinite(infiniteScroll) {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.page = this.page + 1;
    setTimeout(() => {
      this._Service.GetAllNewsByType(this.NewsType, this.languageList,this.page).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          if (this.result.info != null && this.result.info != undefined) {
            for (let i = 0; i < this.result.info.length; i++) {
              this.newsList.push(this.result.info[i]);
            }
            this.perPage = 16;
            this.totalData = this.newsList[0].Totalrecords;
            this.totalPage = this.newsList[0].totalpage;
          }
        }
        infiniteScroll.complete();
        loading.dismiss();
      }, error => {
        //  console.log(error);
        loading.dismiss();
      });
    }, 500);
  }

}
