import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { Test } from '../news-category-modal/publisherModel';
import { FilternewdetailsPage } from '../filternewdetails/filternewdetails';
import * as JQuery from 'jquery';
import { NewsDetailsPage } from '../news-details/news-details';

/**
 * Generated class for the FilterNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-news',
  templateUrl: 'filter-news.html',
})
export class FilterNewsPage {

  filterList: any = [];
  result: any;
  categoryList: any = [];
  filterListdata: any = [];
  filterListdataLength: any;
  filterListdata1: any = [];
  firstcateName: any;
  obj = new Test();
  topNews: any = [];
  languageList: any;
  widthCss: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loadingCtrl: LoadingController,
    private _Service: ServiceProvider,
    public platform: Platform,
    public events: Events) {

    this.filterList = localStorage.getItem("filterList");
    this.filterList = JSON.parse(this.filterList);
    this.firstcateName = this.filterList.cateList.split(',');
    this.firstcateName = this.firstcateName[0];
    this.filterList = JSON.parse(localStorage.getItem("filterList"));

    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    this.getFilterData();
    this.widthCss = ((this.platform.width() / 3));

    platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });

  }

  ionViewDidLoad() {
    this.widthCss = ((this.platform.width() / 3));
    JQuery('.dyn').removeClass('active-cate1');
    JQuery('#test_Top').addClass('active-cate1');
  }

  ionViewDidEnter() {
    this.widthCss = ((this.platform.width() / 3));
  }


  getFilterData() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.filterApi((this.filterList)).then(data => {
      this.result = data;
      this.categoryList = this.result.extra;
      if (this.result.info.length > 0) {
        this.filterListdata = this.result.info;
        //JQuery('.dyn').removeClass('active-cateNew');
        this.filterListdataLength = this.result.info.length;
        setTimeout(() => {
          JQuery('#cate_' + this.firstcateName).addClass('active-cateNew');
        }, 500);
      } else {
        this.filterListdataLength = 0;
      }
      loading.dismiss();
    }, error => {
      // console.log(error.json());
      loading.dismiss();
    });
  }


  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
    });
  }
  goHome() {
    this.navCtrl.pop();
  }


}
