import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainmagazinePage } from './mainmagazine';

@NgModule({
  declarations: [
    MainmagazinePage,
  ],
  imports: [
    IonicPageModule.forChild(MainmagazinePage),
  ],
})
export class MainmagazinePageModule {}
