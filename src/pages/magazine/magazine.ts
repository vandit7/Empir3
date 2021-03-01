import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Content, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { MagazineDetailsPage } from '../magazine-details/magazine-details';

/**
 * Generated class for the MagazinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-magazine',
  templateUrl: 'magazine.html',
})
export class MagazinePage {
  result: any;
  @ViewChild('pageTop') pageTop: Content;

  magazineListLength: any;
  magazineList: any;
  magazineListNotFound: any;
  magazineName : any;
  filterList : any;
  languageList : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public events: Events,
    private _Service: ServiceProvider) {
      this.magazineName = localStorage.getItem("MagazineName");
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
    this.getMagazineList(this.magazineName);
  }


  getMagazineList(magazineName) {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetMagazineListFromname(magazineName,this.languageList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.magazineListLength = this.result.info.length
        if (this.magazineListLength > 0) {
            this.magazineList = this.result.info;
            this.magazineListNotFound = false;
        }
        loading.dismiss();
      }
      else {
        this.magazineListNotFound = true;
      }
    }, error => {
      loading.dismiss();
      //  console.log(error);
    });
  }

  magazinedet(title){
    localStorage.setItem("magtitle", title);
    this.navCtrl.push(MagazineDetailsPage);
  }
}
