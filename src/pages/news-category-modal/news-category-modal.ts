import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController, Toast, MenuController, ModalController } from 'ionic-angular';
import * as JQuery from 'jquery';
import { languageModel } from '../news-category-modal/languageModel';
import { typeModel } from '../news-category-modal/typeModel';
import { publisherModel, Test } from '../news-category-modal/publisherModel';
import { ServiceProvider } from '../../providers/services/services';
import { FilterNewsPage } from '../filter-news/filter-news';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the NewsCategoryModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-category-modal',
  templateUrl: 'news-category-modal.html',
})
export class NewsCategoryModalPage {

  language: any = [];
  category: any = [];
  heightCss = 0;
  lstLanguage: any = [];
  languageFilter: any = [];
  languageModel = new languageModel();
  typeModel = new typeModel();
  typeArray: any = [];
  typeArrayFilter: any = [];
  publisherModel = new publisherModel();
  obj = new Test();
  publishArray: any = [];
  publishModelFilter: any = [];
  righticn: any = "right1.png";
  result: any;
  categoryList: any = [];
  categoryName: any;
  categoryLength: any;
  publisherList: any;
  FilterData: any = [];
  index: any;
  selectedPublish: any = [];
  filterList: any = [];
  languageList: any = [];
  languageList1: any = [];
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    private _Service: ServiceProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.language = [{
      name: 'English',
      name1: 'English'
    },
    {
      name: 'Hindi',
      name1: 'Hindi'
    },
    {
      name: 'Telugu',
      name1: 'Telugu'
    },
    {
      name: 'Tamil',
      name1: 'Tamil'
    },
    {
      name: 'Bengali',
      name1: 'Bengali'
    },
    {
      name: 'Kannada',
      name1: 'Kannada'
    },
    {
      name: 'Malayalam',
      name1: 'Malayalam'
    },
    {
      name: 'Gujarati',
      name1: 'Gujarati'
    },
    {
      name: 'Marathi',
      name1: 'Marathi'
    },
    {
      name: 'Urdu',
      name1: 'Urdu'
    },
    {
      name: 'Asamiya',
      name1: 'Asamiya'
    },
    {
      name: 'Nepali',
      name1: 'Nepali'
    }
    ];
    JQuery(".div-lang").show();
    this.heightCss = (platform.height() / 2);
    this.getcategory();

    this.filterList = JSON.parse(localStorage.getItem("filterList"));
    if (this.filterList != null && this.filterList != undefined) {
      this.languageList1 = this.filterList.languageList;
    } else {
      this.languageList1 = "en";
    }
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    JQuery(".div-category").hide();
    JQuery(".div-publisher").hide();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getcategory() {
    let loading = this.loadingCtrl.create({ spinner: 'hide', content: '<div class="loadersvg"><img class="loader-img" src="../../assets/imgs/loader.svg"> <br> <span class="loader-span">loading..</span></div>' });
    loading.present();
    if (this.selectedPublish.length == 0) {
      this._Service.getPublsher().then(data => {
        this.result = data;
        if (this.result.info.length > 0) {
          this.categoryList = this.result.extra;
          this.languageList = this.result.elist.lstLanguage;
          this.selectedPublish = this.result.info;
          this.publisherList = this.result.info;
          let stringToSplit = this.languageList1;
          let x = stringToSplit.split(",");
          setTimeout(() => {
            x.forEach(element => {
              JQuery("#" + element).addClass('active');
              this.lstLanguage.push({ shortname: element });
            });
          }, 500);
          loading.dismiss();
        } else {
          this.categoryLength = 0;
        }
      }, error => {
        console.log(error.json());
      });
    } else {
      this.publisherList = this.selectedPublish;
      loading.dismiss();
    }
  }

  changeCategory(type) {
    if (type == "lang") {
      JQuery(".language").addClass("selected");
      JQuery(".category").removeClass("selected");
      JQuery(".publisher").removeClass("selected");
      JQuery(".div-category").hide();
      JQuery(".div-publisher").hide();
      JQuery(".div-lang").show();
    }
    if (type == "cate") {
      JQuery(".language").removeClass("selected");
      JQuery(".category").addClass("selected");
      JQuery(".publisher").removeClass("selected");
      JQuery(".div-lang").hide();
      JQuery(".div-category").show();
      JQuery(".div-publisher").hide();
      if (this.filterList != null) {
        if (this.filterList.cateList !=  "") {
          let cate = this.filterList.cateList.split(",");
          setTimeout(() => {
            cate.forEach(element1 => {
              JQuery("#1_" + element1).addClass('active-cate');
              this.typeArray.push({ name: element1 });
            });
          }, 500);
        }
      }
    }
    if (type == "publ") {
      JQuery(".language").removeClass("selected");
      JQuery(".category").removeClass("selected");
      JQuery(".publisher").addClass("selected");
      JQuery(".div-lang").hide();
      JQuery(".div-category").hide();
      JQuery(".div-publisher").show();
    }
  }

  selectlanguage(shortname) {
    this.languageModel.shortName = shortname;
    this.languageFilter = this.lstLanguage.filter(v => v.shortname == shortname);
    if (this.languageFilter.length == 0) {
      this.lstLanguage.push({ shortname: this.languageModel.shortName });
      JQuery("#" + shortname).addClass('active');
    }
    else {
      JQuery("#" + shortname).removeClass('active');
      var x = this.lstLanguage.findIndex(v => v.shortname == shortname);
      if (x !== -1) {
        this.lstLanguage.splice(x, 1);
      }
    }
  }

  selectCategory(type) {
    this.typeModel.name = type;
    this.typeArrayFilter = this.typeArray.filter(v => v.name == type);
    if (this.typeArrayFilter.length == 0) {
      this.typeArray.push({ name: this.typeModel.name });
      JQuery("#1_" + type).addClass('active-cate');
    }
    else {
      JQuery("#1_" + type).removeClass('active-cate');
      var x = this.typeArray.findIndex(v => v.name == type);
      if (x !== -1) {
        this.typeArray.splice(x, 1);
      }
    }
  }

  selectPubliher(publ, index1) {
    this.publisherModel.name = publ;
    this.publishModelFilter = this.publishArray.filter(v => v.name == publ);
    if (this.publishModelFilter.length == 0) {
      this.publishArray.push({ name: this.publisherModel.name });
      JQuery("#" + index1).addClass('active-publ');
      JQuery("#img_" + index1).attr("src", "../../assets/imgs/right.png");
    }
    else {
      JQuery("#" + index1).removeClass('active-publ');
      var x = this.publishArray.findIndex(v => v.name == publ);
      if (x !== -1) {
        this.publishArray.splice(x, 1);
      }
      JQuery("#img_" + index1).attr("src", "../../assets/imgs/right1.png");
    }
  }

  applyFilter() {
    if (this.typeArray.length != 0 || this.publishArray.length != 0) {
      this.obj.cateList = Array.prototype.map.call(this.typeArray, function (item) { return item.name; }).join(",")
      this.obj.languageList = Array.prototype.map.call(this.lstLanguage, function (item) { return item.shortname; }).join(",")
      if (this.obj.languageList == "") {
        this.obj.languageList = 'en'
      }
      this.obj.publisherList = Array.prototype.map.call(this.publishArray, function (item) { return item.name; }).join(",");
      localStorage.removeItem("filterList");
      localStorage.setItem("filterList", JSON.stringify(this.obj));
      this.viewCtrl.dismiss('FilterNewsPage');
      this.navCtrl.push(FilterNewsPage);
    }
    else {
      this.obj.languageList = Array.prototype.map.call(this.lstLanguage, function (item) { return item.shortname; }).join(",")
      if (this.obj.languageList == "") {
        this.obj.languageList = 'en'
      }
      localStorage.removeItem("filterList");
      localStorage.setItem("filterList", JSON.stringify(this.obj));
      this.viewCtrl.dismiss('IsFilter');
    }
  }

  clearall() {
    localStorage.removeItem("filterList");
    this.languageFilter = [];
    this.lstLanguage = [];
    this.typeArray = [];
    this.viewCtrl.dismiss('IsFilter');
  }


}
