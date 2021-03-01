import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ServiceProvider } from '../../providers/services/services';
import { NewsDetailsPage } from '../news-details/news-details';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  filterList: any;
  languageList: any;
  result: any;
  notificationList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public events: Events,
    private _Service: ServiceProvider,
    private socialSharing: SocialSharing) {
    this.filterList = JSON.parse(localStorage.getItem("filterList"));

    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    platform.registerBackButtonAction(() => {
      //this.pageTop.scrollToTop();
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
    
  }

  ionViewDidLoad() {
    this.getNotification();
  }


  share(url) {
    this.socialSharing.share(url, url, null, null)
  }

  getNotification() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetNotificationList(this.languageList).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.notificationList = this.result.info;
      }
      loading.dismiss();
    }, error => {
    });
  }

  
  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
    });
  }

}
