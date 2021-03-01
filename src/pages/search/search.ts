import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard, LoadingController, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import { NewsDetailsPage } from '../news-details/news-details';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public showSearchBar = false;
  result: any;
  searchList: any = [];
  searchListLength: any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public platform: Platform,
    public events: Events,
    private _Service: ServiceProvider,
    public keyboard: Keyboard) {
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

  clickedSearchIcon() {
    this.showSearchBar = !this.showSearchBar;
  }
  getTitles(ev: any) {
    if (ev.target.value != null) {
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this._Service.GetSearchingNews(ev.target.value).then(data => {
        this.result = data;
        if (this.result.info.length > 0) {
          this.searchList = this.result.info;
          this.searchListLength = this.searchList.length;
        }
        else {
          this.searchListLength = this.result.info.length;
        }
        this.keyboard.close();
        loading.dismiss();
      }, error => {
        //  console.log(error.json());
      });
    }
  }

  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
    });
  }

}
