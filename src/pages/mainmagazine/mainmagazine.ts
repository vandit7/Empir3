import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { MagazinePage } from '../magazine/magazine';
import { NewsDetailsPage } from '../news-details/news-details';

/**
 * Generated class for the MainmagazinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainmagazine',
  templateUrl: 'mainmagazine.html',
})
export class MainmagazinePage {
  filterList : any;
  languageList : any;
  languageList2 : any;
  result : any;
  magazineListLength : any;
  magazineList : any;
  magazineNotFound : any;
  @ViewChild('pageTop') pageTop: Content;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public events: Events,
    private _Service: ServiceProvider,
    public loadingCtrl: LoadingController) {
    this.filterList = JSON.parse(localStorage.getItem("filterList"));

    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
      this.languageList2 = this.filterList.languageList;
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
    this.GetMagazine();
  }

  GetMagazine() {
    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetMagazine(this.languageList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.magazineListLength = this.result.info.length;
        if (this.magazineListLength > 0) {
          this.magazineList= this.result.info;
        } else {
          this.magazineNotFound = true;
          this.magazineList = this.result.extra;
        }
        this.pageTop.scrollToTop();
        loading.dismiss();
      }
      else {
        this.magazineNotFound = true;
      }
    }, error => {
      loading.dismiss();
      //  console.log(error);
    });
  }

  getMagazineByName(magazinename) {
    localStorage.setItem("MagazineName", magazinename);
    this.navCtrl.push(MagazinePage);
  }
  goHome() {
    this.navCtrl.pop();
  }

  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
    });
  }
  
}
