import { Component, ViewChild, IterableDiffers } from '@angular/core';
import { NavController, LoadingController, NavParams, Content, Platform, Slides, MenuController, Events, Keyboard } from 'ionic-angular';
import { NewsDetailsPage } from '../news-details/news-details';
import { ModalController } from 'ionic-angular';
import { NewsCategoryModalPage } from '../news-category-modal/news-category-modal';
import { VideoNewsPage } from '../video-news/video-news';
import { ServiceProvider } from '../../providers/services/services';
import * as JQuery from 'jquery';
import { StoryDetailsPage } from '../story-details/story-details';
import { PhotosPage } from '../photos/photos';
import { MagazinePage } from '../magazine/magazine';
import { NotificationPage } from '../notification/notification';
import { ViewallPage } from '../viewall/viewall';
import { Viewall1Page } from '../viewall1/viewall1';
import { SearchPage } from '../search/search';
import { marketModel } from './marketModel';
import { typeModel } from '../news-category-modal/typeModel';
import { AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig, AdMobFree } from '@ionic-native/admob-free';
import { Urls } from '../../../ServerInfo/ApiInfoandData';

declare function test1(): any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;
  @ViewChild('slideWithNav') slideWithNav: Slides;
  sliderOne: any;

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  @ViewChild('MultiItemsScrollingTabs') ItemsTitles: Content;
  @ViewChild(Content) content: Content;
  SwipedTabsIndicator: any = null;
  tabTitleWidthArray: any = [];
  tabElementWidth_px: number = 50;
  screenWidth_px: number = 0;
  isRight: boolean = true;
  isLeft: boolean = true;
  tabs: any = [];
  @ViewChild('pageTop') pageTop: Content;
  greeting: string;
  testSlides: string[] = [];
  @ViewChild('mySlider') mySlider: any;
  madalDismissData: any;
  slides: any[];
  result: any;
  newsList: any = [];
  categoryList: any = [];
  categoryName: any;
  topNews: any = [];
  categoryLength: any;
  catename: any;
  newsEntertainment: any;
  newsAuthor: any;
  newsGoogle: any;
  newsGoogleLenght: any;
  selected_html: any;
  mySlideOptions = {
    pager: true
  };
  widthCss: any;
  HeadLine: any;
  IsTopHeadLine: any;
  newsGoogleTop: any = [];
  newsAuthorLength: any;
  newsListLength: any;
  NewslstVideo: any;
  NewslstVideoLength: any;
  newsSports: any;
  newsSportsLenght: any;
  newsBanner1: any;
  newsBanner1Length: any;
  newsEntertainmentLst: any;
  newsEntertainmentLstLenght: any;
  newsBanner2: any;
  newsBanner2Length: any;
  newsPolitics: any;
  newsPoliticsLenght: any;
  newsBusiness: any;
  newsBusinessLenght: any;
  public counter = 0;
  exitText: any;
  StoryListLength: any;
  StoryList: any = [];
  StoryListNotFound: any;
  marketNotFound: any;
  marketSection: any;
  marketListLength: any;
  marketList: any = [];
  cryptoList: any = [];
  cryptoListLength: any;
  PhotosNotFound: any;
  PhotosListLength: any;
  PhotosList: any = [];
  topSection: any;
  storySection: any;
  photosSection: any;
  magazineSection: any;
  magazineNotFound: any;
  magazineListLength: any;
  magazineList: any = [];
  trendingSection: any;
  trendingNotFound: any;
  newsTrending: any;
  otherSection: any;
  filterList: any;
  languageList: any;
  topSliderLeng: any;
  languageList2: any;
  public showSearchBar = false;
  IsFilter: any;
  forexList: any;
  heightCss: any;
  homeApi: any;
  marketType: any;
  forexList1: any;
  forexListForpair: any;
  sharelist: any;
  marketList1: any;
  cryptoList1: any;
  sharelist1: any;
  x: any;
  iterableDiffer: any;
  IsSearching: any;
  Symbol: any;
  listSection: any;
  isTopSection: any;
  isSlider1: any;
  isVideos: any;
  isSports: any;
  isSlider3: any;
  isSlider2: any;
  isBanner1: any;
  isEntertainment: any;
  isBanner2: any;
  isPolitics: any;
  isBusiness: any;
  livescoreInfo: any;
  team1Score: any;
  team2Score: any;
  team1: any;
  team2: any;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0
  scroll: any;
  favouriteList: any;
  marketModel = new marketModel();
  typeModel = new typeModel();
  shareListLength: any;
  forexListLength: any;
  clickcnt: any = 0;
  clickLcl: any;
  adShow: any = 0;
  adsClick : any;
  dynCount : any;
  urls = new Urls();
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    private _Service: ServiceProvider,
    public platform: Platform,
    public events: Events,
    private iterableDiffers: IterableDiffers,
    public navParams: NavParams,
    public keyboard: Keyboard,
    public loadingCtrl: LoadingController,
    public admob: AdMobFree,
    public modalCtrl: ModalController) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => {
          this.counter = 0
        },
          2000)
      } else {
        platform.exitApp();
      }
    }, 0)
    this.topSection = true;
    this.storySection = false;
    this.photosSection = false;
    this.otherSection = false;
    this.StoryListNotFound = false;
    this.PhotosNotFound = false;
    this.magazineNotFound = false;
    this.tabs = ["Top", "Markets", "Videos", "Story", "Photos", "Magazine"];
    this.filterList = JSON.parse(localStorage.getItem("filterList"));

    if (this.filterList != null && this.filterList != undefined) {
      this.languageList = this.filterList.languageList;
      this.languageList2 = this.filterList.languageList;
    } else {
      this.languageList = "en";
    }
    this.homeApi = "0";
    //this.languageList = "en";
    //this.GetScore();
    this.news('TopNews', this.languageList);
    JQuery('.dyn').removeClass('active-cate1');
    JQuery('#test_' + this.categoryName).addClass('active-cate1');
    this.widthCss = ((this.platform.width() / 4));
  }



  presentToast() {
    this.exitText = true;
    setTimeout(() => { this.exitText = false; }, 2000)
  }
  ionViewDidEnter() {
    this.widthCss = ((this.platform.width() / 4));
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        this.platform.exitApp();
      }
    }, 0)
  }
  ionViewDidLoad() {
    this.widthCss = ((this.platform.width() / 4));
    JQuery('.dyn').removeClass('active-cate1');
    JQuery('#test_Top').addClass('active-cate1');
    clearInterval(this.x);
  }

  newDetailsTo(i, categoryname) {
    JQuery('.dyn1').removeClass('active-cate1');
    JQuery('#test_' + categoryname).addClass('active-cate1');
    if (categoryname == 'Top') {
      this.topSection = true;
      this.storySection = false;
      this.otherSection = false;
      this.photosSection = false;
      this.trendingSection = false;
      this.magazineSection = false;
      this.marketSection = false;
      this.scroll = 'home';
      test1();
      //  this.news('TopNews');
    }
    else if (categoryname == "Videos") {
      this.viewallVideo();
      JQuery('.dyn1').removeClass('active-cate1');
      JQuery('#test_Top').addClass('active-cate1');
      this.topSection = true;
      this.storySection = false;
      this.otherSection = false;
      this.photosSection = false;
      this.trendingSection = false;
      this.magazineSection = false;
      this.marketSection = false;
      this.scroll = 'video';
    }
    else if (categoryname == "Story") {
      this.topSection = false;;
      this.storySection = true;
      this.otherSection = false;
      this.GetTopStoryFrontside();
      this.photosSection = false;
      this.trendingSection = false;
      this.marketSection = false;
      this.scroll = 'Story';
    }
    else if (categoryname == "Photos") {
      this.topSection = false;;
      this.storySection = false;
      this.otherSection = false;
      this.photosSection = true;
      this.trendingSection = false;
      this.magazineSection = false;
      this.marketSection = false;
      this.scroll = 'Photos';
      this.GetPhotosFeed();
    }
    else if (categoryname == "Trending") {
      this.topSection = false;;
      this.storySection = false;
      this.otherSection = false;
      this.photosSection = false;
      this.magazineSection = false;
      this.trendingSection = true;
      this.marketSection = false;
      this.scroll = 'Trending';
      this.GetTrending();
    }
    else if (categoryname == "Markets") {
      this.topSection = false;;
      this.storySection = false;
      this.otherSection = false;
      this.photosSection = false;
      this.trendingSection = false;
      this.magazineSection = false;
      this.marketSection = true;
      this.marketType = "Shares";
      this.scroll = 'Markets';
      this.GetMarketdata();
      this.heightCss = this.platform.height() - 138;
    }
    else if (categoryname == "Magazine") {
      this.topSection = false;;
      this.storySection = false;
      this.otherSection = false;
      this.photosSection = false;
      this.trendingSection = false;
      this.magazineSection = true;
      this.marketSection = false;
      this.GetMagazine();
    }
    else {
      this.topSection = false;
      this.storySection = false;
      this.otherSection = true;
      this.magazineSection = false;
      // JQuery('.dyn1').removeClass('active-cate1');
    }
  }


  openModal() {
    const profileModal = this.modalCtrl.create(NewsCategoryModalPage, { userId: 8675309 }, { cssClass: "mymodal3" });
    profileModal.onDidDismiss(data => {
      this.madalDismissData = JSON.stringify(data);
      this.filterList = JSON.parse(localStorage.getItem("filterList"));
      if (this.filterList != null && this.filterList != undefined) {
        this.languageList = this.filterList.languageList;
      } else {
        this.languageList = "en";
      }
      if (data == 'IsFilter') {
        this.news('TopNews', this.languageList);
      }
    });
    profileModal.present();
  }

  clickedSearchIcon() {
    //this.showSearchBar = !this.showSearchBar;
    this.navCtrl.push(SearchPage);
  }

  viewallVideo() {
    localStorage.setItem("NewsPlay", 'All');
    this.navCtrl.push(VideoNewsPage);
  }


  getnewDetails(Id) {
    this.navCtrl.push(NewsDetailsPage, {
      Id: Id,
      catename: this.categoryName
    });
  }

  videoNews(link, Title) {
    localStorage.setItem("NewsPlay", 'No');
    localStorage.setItem("NewsTitle", Title);
    localStorage.setItem("NewsLink", link);
    this.navCtrl.push(VideoNewsPage);
  }

  news(categoryName, languageList) {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.getNewsList(categoryName, languageList, this.page).then(data => {
      this.scroll = 'home';
      this.result = data;
      if (this.result.status == 1) {
        this.categoryList = this.result.elist.lstCategory;
        this.categoryLength = this.result.elist.length;
        this.newsListLength = this.result.info.length;
        if (this.newsListLength > 9) {
          this.topSliderLeng = 6;
        }
        else {
          this.topSliderLeng = 6;
        }
        if (this.result.info.length > 0) {
          this.newsList = this.result.info;
          this.newsGoogleTop = [];
          for (let i = 0; i < this.topSliderLeng; i++) {
            this.newsGoogleTop.push(this.result.info[i])
          }
        }
        if (this.result.elist.lsttopnewsgoogle.length > 0) {
          this.newsGoogle = this.result.elist.lsttopnewsgoogle;
          this.newsGoogleLenght = this.newsGoogle.length;
        }
        else {
          this.newsGoogleLenght = 0;
        }

        this.newsAuthor = this.result.elist.lstauthor;
        this.newsAuthorLength = this.newsAuthor.length;

        this.NewslstVideo = this.result.elist.lstVideo;
        this.NewslstVideoLength = this.NewslstVideo.length;

        this.topNews = this.result.extra;

        if (this.result.elist.lstsports.length > 0) {
          this.newsSports = this.result.elist.lstsports;
          this.newsSportsLenght = this.newsSports.length;
        }
        else {
          this.newsSportsLenght = 0;
        }

        this.newsBanner1 = this.result.elist.banner1;
        this.newsBanner1Length = this.newsBanner1.length;

        this.newsBanner2 = this.result.elist.banner2;
        this.newsBanner2Length = this.newsBanner2.length;

        if (this.result.elist.lstentertainment.length > 0) {
          this.newsEntertainmentLst = this.result.elist.lstentertainment;
          this.newsEntertainmentLstLenght = this.newsEntertainmentLst.length;
        }
        else {
          this.newsEntertainmentLstLenght = 0;
        }

        if (this.result.elist.lstpolitics.length > 0) {
          this.newsPolitics = this.result.elist.lstpolitics;
          this.newsPoliticsLenght = this.newsPolitics.length;
        }
        else {
          this.newsPoliticsLenght = 0;
        }
        if (this.result.elist.lstbusiness.length > 0) {
          this.newsBusiness = this.result.elist.lstbusiness;
          this.newsBusinessLenght = this.newsBusiness.length;
          this.perPage = 10;
          this.totalData = this.newsBusiness[0].Totalrecords;
          this.totalPage = this.newsBusiness[0].totalpage;
        }
        else {
          this.newsBusinessLenght = 0;
        }
        this.listSection = this.result.elist.lstSection;
        loading.dismiss();
        this.isTopSection = this.listSection[0].IsActive;
        this.isSlider2 = this.listSection[1].IsActive;
        this.isVideos = this.listSection[2].IsActive;
        this.isSports = this.listSection[3].IsActive;
        this.isSlider3 = this.listSection[4].IsActive;
        this.isBanner1 = this.listSection[5].IsActive;
        this.isEntertainment = this.listSection[6].IsActive;
        this.isBanner2 = this.listSection[7].IsActive;
        this.isPolitics = this.listSection[8].IsActive;
        this.isBusiness = this.listSection[9].IsActive;
        this.pageTop.scrollToTop();
        //test1();
        setTimeout(() => {
          JQuery('.dyn').removeClass('active-cate1');
          JQuery('#test_' + categoryName).addClass('active-cate1');
        }, 500);
      }
    }, error => {
      loading.dismiss();
      //  console.log(error);
    });
  }


  /*Story*/
  GetTopStoryFrontside() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.GetTopStoryFrontside('Story').then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.StoryListLength = this.result.info.length
        if (this.StoryListLength > 0) {
          this.StoryList = this.result.info;
        }
        if(this.result.extra != undefined){
          this.dynCount = this.result.extra[0].Click;
        }
        else {
          this.dynCount = 5;
        }
        this.pageTop.scrollToTop();
        this.StoryListNotFound = false;
        loading.dismiss();
      }
      else {
        this.StoryListNotFound = true;
      }
    }, error => {
      loading.dismiss();
    });
  }

  /*photos*/
  GetPhotosFeed() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();

    this._Service.GetPhotos().then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.PhotosListLength = this.result.info.length
        if (this.PhotosListLength > 0) {
          for (let i = 0; i < this.PhotosListLength; i++) {
            this.PhotosList.push(this.result.info[i])
          }
        }
        this.pageTop.scrollToTop();
        this.PhotosNotFound = false;
      }
      else {
        this.PhotosNotFound = true;
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
      //  console.log(error);
    });
  }

  /*Magazine*/
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
        this.magazineList = [];
        this.magazineListLength = this.result.info.length;
        if (this.magazineListLength > 0) {
          for (let i = 0; i < this.magazineListLength; i++) {
            this.magazineList.push(this.result.info[i])
          }
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

  getnewDetailsStory(id) {
    this.clickLcl = localStorage.getItem("StoryCount");
    if (this.clickLcl == this.dynCount) {
      this.clickcnt = 1;
    } else {
      this.clickcnt += 1;
    }
    localStorage.setItem("StoryCount",this.clickcnt);
    this.CountFunction();
    localStorage.setItem("StoryID", id);
    this.navCtrl.push(StoryDetailsPage);
  }

  getPhotosTest(id) {
    localStorage.setItem("PhotosID", id);
    this.navCtrl.push(PhotosPage);
  }

  getMagazineByName(magazinename) {
    localStorage.setItem("MagazineName", magazinename);
    this.navCtrl.push(MagazinePage);
  }


  getEntertainment() {
    this._Service.getNewsList("Entertainment", this.languageList, this.page).then(data => {
      this.result = data;
      if (this.result.info.length > 0) {
        this.newsEntertainment = this.result.info;
      }
    }, error => {
      //  console.log(error.json());
    });
  }


  GetTrending() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this._Service.getTrending(this.languageList, 1).then(data => {
      this.result = data;
      if (this.result.info.length > 0) {
        this.newsTrending = this.result.info;
        this.trendingNotFound = false;
      }
      else {
        this.trendingNotFound = true;
      }
      loading.dismiss();
    }, error => {
      //  console.log(error.json());
    });
  }

  // Get Score
  GetScore() {
    this._Service.GetScore().then(data => {
      this.result = data;
      console.log(this.result)
      if (this.result.status == 1) {
        this.livescoreInfo = this.result.Info;
        this.team1 = this.livescoreInfo.Team1;
        console.log(this.team1)
        this.team2 = this.livescoreInfo.Team2;
        console.log(this.team2)
        this.team1Score = this.livescoreInfo.Team1_Score;
        this.team2Score = this.livescoreInfo.Team2_Score;
        this.trendingNotFound = false;
      }
      else {
        this.trendingNotFound = true;
      }
    }, error => {
      //  console.log(error.json());
    });
  }

  viewAll(categoryName) {
    localStorage.setItem("categoryName", categoryName);
    this.navCtrl.push(ViewallPage);
  }
  getNewsView(type) {
    localStorage.setItem("NewsType", type);
    this.navCtrl.push(Viewall1Page);
  }

  notification() {
    this.navCtrl.push(NotificationPage);
  }
  selectType(type) {
    if (type == 'Market') {
      JQuery("#market").addClass('active');
      JQuery("#shares").removeClass('active');
      JQuery("#crypto").removeClass('active');
      JQuery("#forex").removeClass('active');
      JQuery("#favour").removeClass('active');
      this.marketType = "Market";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.marketListLength = this.result.info.length;
          if (this.marketListLength > 0) {
            this.marketList = this.result.info;
            this.marketList1 = this.marketList;
          } else {
            this.marketListLength = 0;
          }
          this.forexList = [];
          JQuery(".share-div").empty();
          JQuery(".forex-div").empty();
          JQuery(".crypto-div").empty();
          JQuery(".crypto-div").css('display', 'none');
          JQuery(".forex-div").css('display', 'none');
          JQuery(".market-div").css('display', 'block');
          JQuery(".share-div").css('display', 'none');
          JQuery(".favourite-div").css('display', 'none');
          // this.pageTop.scrollToTop();
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
    if (type == 'Shares') {
      JQuery("#market").removeClass('active');
      JQuery("#shares").addClass('active');
      JQuery("#crypto").removeClass('active');
      JQuery("#forex").removeClass('active');
      JQuery("#favour").removeClass('active');
      this.marketType = "Shares";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.marketList = [];
          this.shareListLength = this.result.extra.length;
          if (this.shareListLength > 0) {
            this.sharelist = this.result.extra;
          } else {
            this.shareListLength = 0;
          }
          this.forexList = [];
          JQuery(".crypto-div").empty();
          JQuery(".forex-div").empty();
          JQuery(".market-div").empty();
          JQuery(".crypto-div").css('display', 'none');
          JQuery(".forex-div").css('display', 'none');
          JQuery(".market-div").css('display', 'none');
          JQuery(".share-div").css('display', 'block');
          JQuery(".favourite-div").css('display', 'none');
          this.pageTop.scrollToTop();
          loading.dismiss();
        }
      }, error => {
        loading.dismiss();
      });
    }
    if (type == 'Crypto') {
      JQuery("#market").removeClass('active');
      JQuery("#shares").removeClass('active');
      JQuery("#crypto").addClass('active');
      JQuery("#forex").removeClass('active');
      JQuery("#favour").removeClass('active');
      this.marketType = "Crypto";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.cryptoListLength = this.result.elist.length;
          if (this.cryptoListLength > 0) {
            this.cryptoList = this.result.elist;
            this.cryptoList1 = this.cryptoList;
          } else {
            this.cryptoListLength = 0;
          }
          this.forexList = [];
          this.marketList = [];
          JQuery(".share-div").empty();
          JQuery(".forex-div").empty();
          JQuery(".market-div").empty();
          JQuery(".forex-div").css('display', 'none');
          JQuery(".market-div").css('display', 'none');
          JQuery(".crypto-div").css('display', 'block');
          JQuery(".share-div").css('display', 'none');
          JQuery(".favourite-div").css('display', 'none');
          this.marketNotFound = false;
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
    if (type == 'Forex') {
      JQuery("#market").removeClass('active');
      JQuery("#shares").removeClass('active');
      JQuery("#crypto").removeClass('active');
      JQuery("#forex").addClass('active');
      JQuery("#favour").removeClass('active');
      this.marketType = "Forex";
      this.IsSearching = "0";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.forexListLength = this.result.extra.length;
          if (this.forexListLength > 0) {
            this.forexList = this.result.extra;
            this.forexListForpair = this.forexList;
          } else {
            this.forexListLength = 0;
          }
          this.marketList = [];
          this.cryptoList = [];
          JQuery(".share-div").empty();
          JQuery(".market-div").empty();
          JQuery(".crypto-div").empty();
          JQuery(".share-div").css('display', 'none');
          JQuery(".market-div").css('display', 'none');
          JQuery(".crypto-div").css('display', 'none');
          JQuery(".forex-div").css('display', 'block');
          JQuery(".favourite-div").css('display', 'none');
          this.pageTop.scrollToTop();
          this.marketNotFound = false;
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
  }

  refresh() {
    if (this.marketType == 'Market') {
      JQuery("#market").addClass('active');
      JQuery("#shares").removeClass('active');
      JQuery("#crypto").removeClass('active');
      JQuery("#forex").removeClass('active');
      this.marketType = "Market";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.marketListLength = this.result.info.length;
          if (this.marketListLength > 0) {
            JQuery(".market-div").empty();
            this.marketList = this.result.info;
            this.marketList1 = this.marketList;
            this.marketNotFound = false;
          } else {
            this.marketNotFound = true;
          }
          JQuery(".crypto-div").css('display', 'none');
          JQuery(".forex-div").css('display', 'none');
          JQuery(".market-div").css('display', 'block');
          JQuery(".share-div").css('display', 'none');
          // this.pageTop.scrollToTop();
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
    if (this.marketType == 'Shares') {
      JQuery("#market").removeClass('active');
      JQuery("#shares").addClass('active');
      JQuery("#crypto").removeClass('active');
      JQuery("#forex").removeClass('active');
      this.marketType = "Shares";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();

      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.shareListLength = this.result.extra.length;
          if (this.result.extra.length > 0) {
            JQuery(".share-div").empty();
            this.sharelist = [];
            this.sharelist = this.result.extra;
          }
          else {
            this.shareListLength = 0;
          }
          JQuery(".crypto-div").css('display', 'none');
          JQuery(".forex-div").css('display', 'none');
          JQuery(".market-div").css('display', 'none');
          JQuery(".share-div").css('display', 'block');
          // this.pageTop.scrollToTop();
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
    if (this.marketType == 'Crypto') {
      JQuery("#market").removeClass('active');
      JQuery("#shares").removeClass('active');
      JQuery("#crypto").addClass('active');
      JQuery("#forex").removeClass('active');
      this.marketType = "Crypto";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();

      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.cryptoListLength = this.result.elist.length;
          if (this.cryptoListLength > 0) {
            JQuery(".crypto-div").empty();
            this.cryptoList = this.result.elist;
            this.cryptoList1 = this.cryptoList;
            this.marketNotFound = false;
          } else {
            this.magazineNotFound = true;
          }
          // if (this.result.extra.length > 0) {
          //   this.forexList = this.result.extra;
          // }
          this.forexList = [];
          this.marketList = [];
          JQuery(".forex-div").css('display', 'none');
          JQuery(".market-div").css('display', 'none');
          JQuery(".crypto-div").css('display', 'block');
          JQuery(".share-div").css('display', 'none');
          // this.pageTop.scrollToTop();
          //this.content.scrollToPoint(100,0,1500);
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
    if (this.marketType == 'Forex') {
      JQuery("#market").removeClass('active');
      JQuery("#shares").removeClass('active');
      JQuery("#crypto").removeClass('active');
      JQuery("#forex").addClass('active');
      this.marketType = "Forex";
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      this.IsSearching = "0";
      this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
        this.result = data;
        JQuery(".forex-div").empty();
        if (this.result.status == 1) {
          this.forexListLength = this.result.extra.length;
          if (this.result.extra.length > 0) {
            this.forexList = this.result.extra;
            this.forexListForpair = this.forexList;
          } else {
            this.forexListLength = 0;
          }
          this.marketList = [];
          this.cryptoList = [];
          JQuery(".forex-div").css('display', 'block');
          JQuery(".market-div").css('display', 'none');
          JQuery(".crypto-div").css('display', 'none');
          JQuery(".share-div").css('display', 'none');
          //this.pageTop.scrollToTop();
          loading.dismiss();
        }
        else {
          this.marketNotFound = true;
        }
      }, error => {
        loading.dismiss();
      });
    }
  }

  addfavourite() {
    JQuery("#market").removeClass('active');
    JQuery("#shares").removeClass('active');
    JQuery("#crypto").removeClass('active');
    JQuery("#forex").removeClass('active');
    JQuery("#favour").addClass('active');
    JQuery(".share-div").empty();
    JQuery(".forex-div").empty();
    JQuery(".crypto-div").empty();
    JQuery(".market-div").empty();
    JQuery(".crypto-div").css('display', 'none');
    JQuery(".forex-div").css('display', 'none');
    JQuery(".market-div").css('display', 'none');
    JQuery(".share-div").css('display', 'none');
    JQuery(".favourite-div").css('display', 'block');
  }

  addfavouriteList(Id) {
    if (this.marketType == 'Market') {
      this.marketModel.marketList.push(Id);
    }
    if (this.marketType == 'Shares') {
      if (this.marketModel.sharesList.length > 0) {
        this.marketModel.sharesList.push(Id);
        var x = this.marketModel.sharesList.findIndex(v => v.Id == Id);
        if (x !== -1) {
          this.marketModel.sharesList.splice(x, 1);
        }
      } else {
        this.marketModel.sharesList.push(Id);
      }
    }
    if (this.marketType == 'Crypto') {
    }
    if (this.marketType == 'Forex') {
    }
  }

  /*Market*/
  GetMarketdata() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    this.IsSearching = "0";
    this._Service.GetMarketdata(this.marketType, this.IsSearching, this.Symbol).then(data => {
      this.result = data;
      if (this.result.status == 1) {
        this.shareListLength = this.result.extra.length;
        if (this.result.extra.length > 0) {
          this.sharelist = this.result.extra;
          // this.sharelist1 = this.sharelist;
        } else {
          this.shareListLength = 0;
        }
        if (this.marketType == 'Shares') {
          JQuery("#shares").addClass('active');
        }
        JQuery(".crypto-div").css('none');
        JQuery(".share-div").css('block');
        this.pageTop.scrollToTop();
        this.marketNotFound = false;
        loading.dismiss();
      }
      else {
        this.marketNotFound = true;
      }
    }, error => {
      loading.dismiss();
    });
  }


  searchData(ev: any) {
    if (ev.target.value != null && ev.target.value != "") {
      let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
      loading.present();
      let symbol = ev.target.value;
      if (this.marketType == 'Shares') {
        if (ev.target.value) {
          //this.sharelist = this.sharelist1.filter(v => v.Symbol.toLowerCase() == symbol.toLowerCase());
          this.IsSearching = 1;
          this._Service.GetMarketdata(this.marketType, this.IsSearching, symbol).then(data => {
            this.result = data;
            if (this.result.status == 1) {
              this.sharelist = [];
              JQuery(".share-div").empty();
              this.shareListLength = this.result.extra.length;
              if (this.result.extra.length > 0) {
                this.sharelist = this.result.extra;
              }
              else {
                this.shareListLength = 0;
              }
              if (this.marketType == 'Shares') {
                JQuery("#shares").addClass('active');
              }
              JQuery(".crypto-div").css('none');
              JQuery(".share-div").css('block');
              //loader.dismiss();
            }
            else {
              this.shareListLength = 0;
            }
          }, error => {
            loading.dismiss();
          });
        }
      }
      if (this.marketType == "Market") {
        if (ev.target.value.length > 2) {
          this.IsSearching = 1;
          this._Service.GetMarketdata(this.marketType, this.IsSearching, symbol).then(data => {
            this.result = data;
            if (this.result.status == 1) {
              this.marketListLength = this.result.info.length;
              if (this.marketListLength > 0) {
                this.marketList = this.result.info;
              } else {
                this.marketListLength = 0;
              }
              this.forexList = [];
            }
            else {
              this.marketListLength = 0;
            }
          }, error => {
            loading.dismiss();
          });
        }
      }
      if (this.marketType == 'Crypto') {
        if (ev.target.value.length > 2) {
          this.IsSearching = 1;
          this._Service.GetMarketdata(this.marketType, this.IsSearching, symbol).then(data => {
            this.result = data;
            if (this.result.status == 1) {
              this.cryptoListLength = this.result.elist.length;
              if (this.cryptoListLength > 0) {
                this.cryptoList = this.result.elist;
              } else {
                this.magazineNotFound = true;
              }
              this.forexList = [];
              this.marketList = [];
              this.marketNotFound = false;
              loading.dismiss();
            }
            else {
              this.marketNotFound = true;
            }
          }, error => {
            loading.dismiss();
          });
        }
      }
      if (this.marketType == 'Forex') {
        if (ev.target.value.length > 2) {
          this.IsSearching = 1;
          this._Service.GetMarketdata(this.marketType, this.IsSearching, symbol).then(data => {
            this.result = data;
            if (this.result.status == 1) {
              if (this.result.extra.length > 0) {
                this.forexListLength = this.result.extra.length;
                this.forexList = this.result.extra;
              }else{
               this.forexList = [];
               this.forexListLength = 0;
              }
              this.marketList = [];
              this.cryptoList = [];
            }
            else {
              this.forexListLength = 0;
            }
          }, error => {
            loading.dismiss();
          });
        }
        //this.forexList = this.forexList.filter(v => v.Symbol.toLowerCase() == symbol.toLowerCase());
      }
      this.keyboard.close();
      loading.dismiss();
    }
  }

  updateList(ev) {
    console.log(ev.target.value);
  }

  doInfinite(infiniteScroll) {
    if (this.scroll == 'home') {
      this.page = this.page + 1;
      this._Service.getNewsList('business', this.languageList, this.page).then(data => {
        this.result = data;
        if (this.result.status == 1) {
          this.newsListLength = this.result.info.length;
          if (this.result.elist.lstbusiness.length > 0) {
            this.newsBusinessLenght = this.result.elist.lstbusiness.length;
            for (let i = 0; i < this.result.elist.lstbusiness.length; i++) {
              this.newsBusiness.push(this.result.elist.lstbusiness[i]);
            }
            this.perPage = 10;
            this.totalData = this.result.elist.lstbusiness[0].Totalrecords;
            this.totalPage = this.result.elist.lstbusiness[0].totalpage;
          }
          infiniteScroll.complete();
        }
      }, error => {
        //  console.log(error);
      });
    }
    else {
      infiniteScroll.complete();
    }
  }

  CountFunction(){
    if (this.clickLcl == this.dynCount) {
      if (this.adShow == 1) {
        this.adShow = 0;
        //this.launchInterstitial();
      } else {
        this.adShow = 1;
        //this.showRewardVideoAds();
      }
    }
  }

  // launchInterstitial() {
  //   let interstitialConfig: AdMobFreeInterstitialConfig = {
  //     //isTesting: true,
  //     autoShow: true,
  //     id: "ca-app-pub-7411514458694945/6378753390"
  //   };

  //   this.admob.interstitial.config(interstitialConfig);
  //   this.admob.interstitial.prepare().then((result) => {
  //   });

  // }
  // showRewardVideoAds() {
  //   let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
  //     //isTesting: true, // Remove in production
  //     autoShow: true,
  //     id: "ca-app-pub-7411514458694945/3752590056"
  //   };
  //   this.admob.rewardVideo.config(RewardVideoConfig);
  //   this.admob.rewardVideo.prepare().then(() => {
  //   }).catch(e => alert(e));
  // }
}
