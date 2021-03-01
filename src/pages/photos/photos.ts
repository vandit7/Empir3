import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  result: any;
  content1: any;
  image: any;
  description: any;
  PhotosID:any;
  photoList: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public events: Events,
    private _Service: ServiceProvider) {
      platform.registerBackButtonAction(() => {
        this.navCtrl.pop();
      });
  }

  ionViewDidEnter() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
      this.events.publish('user:created', '');
    });
  }

  ionViewDidLoad() {
    this.getPhotosDetails();
  }

  getPhotosDetails() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.PhotosID =localStorage.getItem("PhotosID");
    this._Service.GetPhotosFromId(this.PhotosID).then(data => {
      this.result = data;
      if (this.result.status == 1) {
       this.photoList = this.result.info;
      
       setTimeout(() => {
        loading.dismiss();
      }, 1500);
      }

    }, error => {
      loading.dismiss();
      // console.log(error.json());
    });
  }

}
