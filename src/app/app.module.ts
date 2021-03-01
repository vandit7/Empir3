import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { NewsDetailsPage } from '../pages/news-details/news-details';
import { NewsCategoryModalPage } from '../pages/news-category-modal/news-category-modal';
import { VideoNewsPage } from '../pages/video-news/video-news';
import { ServiceProvider } from '../providers/services/services';
import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { SocialSharing } from '@ionic-native/social-sharing';

import { FilterNewsPage } from '../pages/filter-news/filter-news';
import { FilternewdetailsPage } from '../pages/filternewdetails/filternewdetails';
import { SubcategoryPage } from '../pages/subcategory/subcategory'; 
import { IonicImageViewerModule } from 'ionic-img-viewer'; 
import { StoryDetailsPage } from '../pages/story-details/story-details';
import { PhotosPage } from '../pages/photos/photos';
import { MagazinePage } from '../pages/magazine/magazine';
import { MagazineDetailsPage } from '../pages/magazine-details/magazine-details';
import { NotificationPage } from '../pages/notification/notification';
import { ViewallPage } from '../pages/viewall/viewall';
import { Viewall1Page } from '../pages/viewall1/viewall1';
import { SearchPage } from '../pages/search/search';
import { AuthorpagePage } from '../pages/authorpage/authorpage';
import { TrendingPage } from '../pages/trending/trending';
import { MainmagazinePage } from '../pages/mainmagazine/mainmagazine';
import { AdMobFree } from '@ionic-native/admob-free';
import { CovidPage } from '../pages/covid/covid';

@NgModule({
  declarations: [
    MyApp, 
    HomePage, 
    SubcategoryPage, 
    ListPage,  
    SplashPage,
    NewsDetailsPage,
    StoryDetailsPage, 
    NewsCategoryModalPage,
    VideoNewsPage,
    FilterNewsPage, 
    FilternewdetailsPage,
    PhotosPage,
    MagazinePage,
    MagazineDetailsPage,
    NotificationPage,
    ViewallPage,
    Viewall1Page,
    SearchPage,
    AuthorpagePage,
    TrendingPage,
    MainmagazinePage,
    CovidPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubcategoryPage, 
    ListPage,
    SplashPage,
    NewsDetailsPage,
    StoryDetailsPage,
    NewsCategoryModalPage,
    VideoNewsPage,
    FilterNewsPage,
    FilternewdetailsPage,
    PhotosPage,
    MagazinePage,
    MagazineDetailsPage,
    NotificationPage,
    ViewallPage,
    Viewall1Page, 
    SearchPage,
    AuthorpagePage,
    TrendingPage,
    MainmagazinePage,
    CovidPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
  ]
})
export class AppModule {}
