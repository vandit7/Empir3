import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryDetailsPage } from './story-details';

@NgModule({
  declarations: [
    StoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryDetailsPage),
  ],
})
export class StoryDetailsPageModule {}
