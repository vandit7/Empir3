import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CovidPage } from './covid';

@NgModule({
  declarations: [
    CovidPage,
  ],
  imports: [
    IonicPageModule.forChild(CovidPage),
  ],
})
export class CovidPageModule {}
