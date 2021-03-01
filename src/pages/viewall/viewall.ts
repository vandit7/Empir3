import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, MenuController, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { NewsDetailsPage } from '../news-details/news-details';

@IonicPage()
@Component({
  selector: 'page-viewall',
  templateUrl: 'viewall.html',
})
export class ViewallPage {
  result: any;
  newsList: any = [];
  categoryName: any;
  filterList: any;
  languageList: any;
  newsListLength: any;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0
  constructor(public navCtrl: NavController,
    private _Service: ServiceProvider,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public events: Events,
    public navParams: NavParams) {
    this.filterList = JSON.parse(localStorage.getItem("filterList"));
    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    this.getAllDetails();
    this.menuCtrl.enable(true);

    platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidLoad() {
    // this.getAllDetails()
    console.log('ionViewDidLoad ViewallPage');
  }

  ionViewDidEnter(){
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
    });
  }


  getAllDetails() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.categoryName = localStorage.getItem("categoryName");
    this._Service.GetAllNewsCategoryWise(this.categoryName, this.languageList,this.page).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        if (this.result.info != null && this.result.info != undefined) {
          this.newsList = this.result.info;
          this.newsListLength = this.newsList.length;
          this.perPage = 15;
          this.totalData = this.newsList[0].Totalrecords;
          this.totalPage = this.newsList[0].totalpage;
        }
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
      // console.log(error.json());
    });
  }

  doInfinite(infiniteScroll) {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.page = this.page + 1;
    this.categoryName = localStorage.getItem("categoryName");
    setTimeout(() => {
      this._Service.GetAllNewsCategoryWise(this.categoryName, this.languageList,this.page).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          if (this.result.info != null && this.result.info != undefined) {
            this.newsListLength = this.result.info.length;
            for (let i = 0; i < this.result.info.length; i++) {
              this.newsList.push(this.result.info[i]);
            }
            this.perPage = 15;
            this.totalData = this.newsList[0].Totalrecords;
            this.totalPage = this.newsList[0].totalpage;
          }
        }
        infiniteScroll.complete();
        loading.dismiss();
      }, error => {
        // console.log(error.json());
        loading.dismiss();
      });
    }, 500);
  }


  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
      catename: this.categoryName
    });
  }
}
