import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { detailsModel } from '../news-details/detailsModel';
/**
 * Generated class for the FilternewdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filternewdetails',
  templateUrl: 'filternewdetails.html',
})
export class FilternewdetailsPage {

  title: any;
  catename: any;
  result: any;
  info: any;
  content1: any;
  image: any;
  description: any;
  publishedAt: any;
  author: any;
  categoryList: any;
  filterList: any;
  dtmodel = new detailsModel();
  languageList: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _Service: ServiceProvider,
    public platform: Platform,
    public events: Events,
    public loadingCtrl: LoadingController, ) {
    this.title = this.navParams.get('title');
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
    
  }

  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidLoad() {
    this.getcategory();
    this.newsDetails();
  }

  getcategory() {
    this._Service.getCategoryList(this.languageList).then(data => {
      this.result = data;
      this.categoryList = this.result.info;
      setTimeout(() => {
        JQuery("#" + this.catename).addClass('active-cate1');
      }, 500);
    }, error => {
      //   console.log(error.json());
    });
  }

  goMainfilter() {
    this.navCtrl.pop();
  }

  newsDetails() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.dtmodel.title = this.title;
    this._Service.getNewsDet(this.dtmodel).then(data => {
      this.result = data;
      this.info = this.result.info[0];
      if (this.info.content != null && this.info.content != undefined && this.info.content != '') {
        this.content1 = this.info.content;
      } else {
        this.content1 = this.info.title;
      }
      this.image = this.info.urlToImage;
      this.description = this.info.description;
      this.publishedAt = this.info.publishedAt;
      this.author = this.info.author;
      loading.dismiss();
    }, error => {
      //  console.log(error.json());
    });
  }

}
