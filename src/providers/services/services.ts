import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urls, headers, ApiErrors } from '../../../ServerInfo/ApiInfoandData';

@Injectable()
export class ServiceProvider {
  urls = new Urls();
  ApiErrors = new ApiErrors();
  //headers = new headers();
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(public _httpClient: HttpClient) { 
  }
 
  getNewsList(type,languageList,page) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetNews?type='+type+'&language='+languageList+'&page='+page, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  GetSearchingNews(title) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetSearchingNews?title='+title, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  getTrending(languageList,page) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetAllTreandingNews?language='+languageList+'&page='+page, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  GetScore() {
    return new Promise((resolve, reject) => {
      this._httpClient.get('https://teamapi.titanprojects.co/Class/GetScoreOtherSite.php')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  getNewByAuthor(author,languageList) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetAllAuthorData?author='+author+'&language='+languageList, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  // GetNewsByCategory(type,languageList) {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(this.urls.baseUrlOfLocal + 'GetNewsByCategory?type='+type+'&language='+languageList, this.httpOptions)
  //       .subscribe(res => {  
  //         resolve(res);
  //       }, (err) => {
  //         reject(err); 
  //       });
  //   });
  // }
  GetNewsByCategory(type,languageList,page) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetNewsByCategory?type='+type+'&language='+languageList+'&page='+page, this.httpOptions)
        .subscribe(res => {  
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  GetTopStoryFrontside(pagename) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetTopStoryFrontside?pagename='+pagename, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetMagazineListFromname(magazinename,languageList) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetSpecificMagazineList?magazinename='+magazinename+'&language='+languageList, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetMagazinetitle(title) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetMagazineDetails?title='+title, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetPhotos() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetPhotosFrontside', this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetMagazine(languageList) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetMagazineByLanguage?language='+languageList, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetMarketdata(type,IsSearching,Symbol1) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetStockList?type='+type+'&IsSearching='+IsSearching+'&Symbol='+Symbol1, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetMainCategory() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetMaincategory', this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  GetTopStoryFromId(ID) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetTopStoryFromId?Id='+ID, this.httpOptions)
        .subscribe(res => {  
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  GetPhotosFromId(ID) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetPhotosFromId?Id='+ID, this.httpOptions)
        .subscribe(res => {  
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  GetAdsClicks(pagename) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetAdsClickList?pagename='+pagename, this.httpOptions)
        .subscribe(res => {  
          resolve(res);
        }, (err) => {
          reject(err); 
        });
    });
  }

  getNewsbyauthor() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetNewsbyAuthor', this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getCategoryList(languageList) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'Getcategory?language='+languageList, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }); 
    });
  }

  GetNotificationList(languageList) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetNotification?language='+languageList, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }); 
    });
  }

  filterApi(filterList) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(this.urls.baseUrlOfLocal + 'filterApi',filterList)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getPublsher() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetPublisherList', this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  
  // getNewsDet(data) {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(this.urls.baseUrlOfLocal + 'GetNewsDetails?title='+data, this.httpOptions)
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // } 

  getNewsDet(data) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(this.urls.baseUrlOfLocal + 'NewsDetails',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetAllNewsCategoryWise(type,languageList,page) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetAllNewsCategoryWise?type='+type+'&language='+languageList+'&page='+page, this.httpOptions)
        .subscribe(res => { 
          resolve(res);
        }, (err) => {
          reject(err);
        }); 
    });
  }

  GetAllNewsByType(type,languageList,page) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetAllNewsByType?type='+type+'&language='+languageList+'&page='+page, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        }); 
    });
  } 
  GetAllVideo(pagename) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetAllVideo?pagename='+pagename, this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetAllDetailscorona() {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.urls.baseUrlOfLocal + 'GetCoronaNews', this.httpOptions)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  
  
}
