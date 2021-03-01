import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsCategoryModalPage } from './news-category-modal';

@NgModule({
  declarations: [
    NewsCategoryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsCategoryModalPage),
  ],
})
export class NewsCategoryModalPageModule {}
