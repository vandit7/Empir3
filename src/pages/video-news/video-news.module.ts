import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoNewsPage } from './video-news';

@NgModule({
  declarations: [
    VideoNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoNewsPage),
  ],
})
export class VideoNewsPageModule {}
