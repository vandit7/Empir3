import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterNewsPage } from './filter-news';

@NgModule({
  declarations: [
    FilterNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterNewsPage),
  ],
})
export class FilterNewsPageModule {}
