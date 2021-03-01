import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';

/**
 * Generated class for the MagazineDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-magazine-details',
  templateUrl: 'magazine-details.html',
})
export class MagazineDetailsPage {
  result: any;
  magazineListLength: any;
  magazineList: any;
  magazineListNotFound: any;
  title : any;
  newsTitle : any;
  description : any;
  image : any;
  author :any;
  magazineName  :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public events: Events,
    private _Service: ServiceProvider) {
     this.title = localStorage.getItem("magtitle");
     this.magazineName = localStorage.getItem("MagazineName");

     platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidLoad() {
    this.magazinedet(this.title)
  }

  magazinedet(title){
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetMagazinetitle(title).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.magazineListLength = this.result.info;
        if (this.magazineListLength != null && this.magazineListLength != undefined) {
            this.magazineList = this.result.info;
            this.author = this.result.info.author;
            this.newsTitle = this.magazineList.title;
            this.description = this.magazineList.description;
            this.image = this.magazineList.urlToImage;
            this.magazineListNotFound = true;
        }
        loading.dismiss();
      }
      
    }, error => {
      loading.dismiss();
    });
  }
}
