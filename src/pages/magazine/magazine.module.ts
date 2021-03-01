import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MagazinePage } from './magazine';

@NgModule({
  declarations: [
    MagazinePage,
  ],
  imports: [
    IonicPageModule.forChild(MagazinePage),
  ],
})
export class MagazinePageModule {}
