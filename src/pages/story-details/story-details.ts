import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, Events } from 'ionic-angular';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';

@IonicPage()
@Component({
  selector: 'page-story-details',
  templateUrl: 'story-details.html',
})
export class StoryDetailsPage {
  result: any;
  content1: any;
  image: any;
  description: any;
  StoryID: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    private _Service: ServiceProvider) {
    platform.registerBackButtonAction(() => {
      this.navCtrl.pop();
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
    this.storyDetails();
  }
  storyDetails() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.StoryID = localStorage.getItem("StoryID");
    this._Service.GetTopStoryFromId(this.StoryID).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.content1 = this.result.info.title;
        this.image = this.result.info.urlToImage;
        this.description = this.result.info.description;
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
      // console.log(error.json());
    });
  }
}
