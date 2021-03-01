import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, LoadingController, Content } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { NewsDetailsPage } from '../news-details/news-details';

/**
 * Generated class for the AuthorpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authorpage',
  templateUrl: 'authorpage.html',
})
export class AuthorpagePage {
  name: any;
  result: any;
  filterList: any;
  languageList: any;
  authorList: any;
  authorListNotFound: any;
  @ViewChild('pageTop') pageTop: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    private _Service: ServiceProvider,
    public platform: Platform) {
    this.name = this.navParams.get('authorname');

    this.filterList = JSON.parse(localStorage.getItem("filterList"));

    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    this.getNewByAuthor();
    platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorpagePage');
  }

  getNewByAuthor() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.getNewByAuthor(this.name, this.languageList).then(data => {
      this.result = data;
      if (this.result.info.length > 0) {
        this.authorList = this.result.info;
        this.authorListNotFound = false;
      }
      else {
        this.authorListNotFound = true;
        this.authorList = this.result.extra.lstNVbusiness;
      }
      this.pageTop.scrollToTop();
      loading.dismiss();
    }, error => {
      //  console.log(error.json());
      loading.dismiss();
    });
  }
  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id
    });
  }
}
