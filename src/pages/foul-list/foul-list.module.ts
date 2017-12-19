import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoulListPage } from './foul-list';

@NgModule({
  declarations: [
    FoulListPage,
  ],
  imports: [
    IonicPageModule.forChild(FoulListPage),
  ],
})
export class FoulListPageModule {}
