import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorpagePage } from './authorpage';

@NgModule({
  declarations: [
    AuthorpagePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthorpagePage),
  ],
})
export class AuthorpagePageModule {}
