import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MagazineDetailsPage } from './magazine-details';

@NgModule({
  declarations: [
    MagazineDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MagazineDetailsPage),
  ],
})
export class MagazineDetailsPageModule {}
